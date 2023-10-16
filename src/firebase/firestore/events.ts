import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

export default async function getEvents() {
    const eventsCol = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCol);
    const eventsList = eventsSnapshot.docs.map(doc => doc.data());
    return eventsList;
}