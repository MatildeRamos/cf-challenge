import { DocumentReference, addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../config";
import { IEvent, IHost } from "@/types/events";

const EVENTS_LIMIT = 10;

export async function getEvents(page: number = 1) {
    const eventsCol = collection(db, 'events');

    let q;
    if (page && page > 1) {
        // Query already loaded events
        const loaded = query(eventsCol, orderBy("createdAt", "desc"), limit((page - 1) * EVENTS_LIMIT));
        const documentSnapshots = await getDocs(loaded);

        // Get the last visible document
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        // Construct a new query starting at this document
        q = query(eventsCol,
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(EVENTS_LIMIT));

    } else {
        q = query(eventsCol, orderBy("createdAt", "desc"), limit(EVENTS_LIMIT));
    } 
    
    const eventsSnapshot = await getDocs(q);
    const eventsList = await Promise.all(eventsSnapshot.docs.map(async doc => {
        let hostData: IHost[] = [];
            
        if (doc.data().hosts){
            hostData = await getHosts(doc.data().hosts) as IHost[];
        }

        return {
            id: doc.id,
            ...doc.data(),
            date: doc.data().date?.toDate(),
            createdAt: doc.data().createdAt?.toDate(),
            hosts: [...hostData],
        };
    }));
    return {data: eventsList, pageInfo: {page: page}};
}

export async function createEvent(event: IEvent) {

    const hostsRef= doc(collection(db, "hosts"));
    console.log(hostsRef);
    console.log(hostsRef.path);

    //hardcode first host
    const hosts = query(collection(db, "hosts"), limit(1));
    const documentSnapshots = await getDocs(hosts);
    const firstHost = documentSnapshots.docs[0];

    //hardcode tomorrow's date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    

    const newEvent = {
        ...event, 
        createdAt: new Date(),
        date: tomorrow,
        hosts: [firstHost.ref],
    };
    const eventsCol = collection(db, 'events');

    const docRef = await addDoc(eventsCol, newEvent);
    return docRef;
}

export function subscribeEvents(callback: (data: IEvent[], limit: number) => void){
    let q = query(collection(db, "events"), orderBy('createdAt', "desc"));
    
    const unsubscribe = onSnapshot(q, async querySnapshot => {
		const results = await Promise.all(querySnapshot.docs.map(async doc => {
            let hostData: IHost[] = [];
            
            if (doc.data().hosts){
                hostData = await getHosts(doc.data().hosts) as IHost[];
            }

			return {
				id: doc.id,
                ...doc.data(),
                date: doc.data().date?.toDate(),
                createdAt: doc.data().createdAt?.toDate(),
                hosts: [...hostData],
			};
		}));

		callback(results, EVENTS_LIMIT);
	});

	return unsubscribe;
}

function getHosts(hosts: DocumentReference[]){
    return Promise.all(hosts.map(async (docRef: DocumentReference) => {
        const host = await getDoc(docRef);
        return {
            id: host.id,
            ...host.data(),
        }
    }));

}