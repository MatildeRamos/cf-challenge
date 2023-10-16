import getEvents from "@/firebase/firestore/events";
import RealtimeEvents from "./realtime-events";
import { IEvent } from "@/types/events";


export default async function Events(){

    const fetchData = async () => {
        const data = await fetch(`${process.env.API_URL}/api/events`);
        const eventList: IEvent[] = await data.json();
        return eventList
    }

    
    const events = await fetchData();
    return (
        <div>
            {events.map((event)=>(event.title))}
        </div>
    );
}