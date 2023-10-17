import Link from "next/link";
import RealtimeEvents from "./realtime-events";


export default async function Events(){

    return (
        <div>
            <Link href={'/events/create'}>Create New Event</Link>
            <RealtimeEvents />
        </div>
    );
}