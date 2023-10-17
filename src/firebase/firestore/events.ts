import { DocumentReference, addDoc, collection, doc, getDocs, limit, onSnapshot, orderBy, query, startAfter, startAt } from "firebase/firestore";
import { db } from "../config";
import { IEvent } from "@/types/events";

const EVENTS_LIMIT = 2;

export async function getEvents(page: number = 1) {
    const eventsCol = collection(db, 'events');

    let q;
    if (page && page > 1) {
        // Query the first page of docs
        const first = query(eventsCol, orderBy("createdAt"), limit((page - 1) * EVENTS_LIMIT));
        const documentSnapshots = await getDocs(first);

        // Get the last visible document
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

        // Construct a new query starting at this document
        q = query(eventsCol,
            orderBy("createdAt"),
            startAfter(lastVisible),
            limit(EVENTS_LIMIT));

    } else {
        q = query(eventsCol, orderBy("createdAt"), limit(EVENTS_LIMIT));
    } 
    
    const eventsSnapshot = await getDocs(q);
    const eventsList = eventsSnapshot.docs.map(doc => doc.data());
    return {data: eventsList, pageInfo: {page: page}};
}

export async function createEvent(event: IEvent) {
    const newEvent = {...event, createdAt: new Date()}
    const eventsCol = collection(db, 'events');

    try {
        const docRef = await addDoc(eventsCol, newEvent);
        return docRef;
    } catch (e) {
        console.log("Error creating event: ", e);
    }
}

export function subscribeEvents(callback: (data: IEvent[], limit: number) => void){
    let q = query(collection(db, "events"), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
        /*querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              console.log('New city: ', change.doc.data());
            }
            if (change.type === 'modified') {
              console.log('Modified city: ', change.doc.data());
            }
            if (change.type === 'removed') {
              console.log('Removed city: ', change.doc.data());
            }
            console.log(change.type);
            console.log(change.doc.data());
            
          });*/
		const results = querySnapshot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data(),
				// Only plain objects can be passed to Client Components from Server Components
				// timestamp: doc.data().timestamp.toDate(),
			};
		});

		callback(results, EVENTS_LIMIT);
	});

	return unsubscribe;
}