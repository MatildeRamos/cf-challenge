"use client"
import { subscribeEvents } from "@/firebase/firestore/events";
import { EEventStatus, IEvent, IEventPageInfo } from "@/types/events"
import axios from "axios";
import { useEffect, useRef, useState } from "react"

export default function RealtimeEvents() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [eventPageInfo, setEventPageInfo] = useState<IEventPageInfo>({page: 1})
    const [eventStateFilter, setEventStateFilter] = useState<EEventStatus>(EEventStatus.ALL);
    const pageStateRef = useRef<IEventPageInfo>();
    pageStateRef.current = eventPageInfo;

    const loadMore = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {params: {page: eventPageInfo.page + 1, status: eventStateFilter}})
        console.log(response.data);
        const {data, pageInfo } = response.data;
        console.log(data, pageInfo);
        if (data){
            setEvents([...events, ...data])
            setEventPageInfo(pageInfo)
        } else {
            setEventPageInfo({...eventPageInfo})
        }
        return data;

    }


    useEffect(() => {
		const unsubscribe = subscribeEvents((data: IEvent[], limit: number) => {
            if (pageStateRef.current){
			    setEvents(data.slice(0, limit * pageStateRef.current.page));
            }
		});

		return () => {
			unsubscribe();
		};
	}, []);

    useEffect(()=>{
        console.log("events ", events, eventPageInfo)
    }, [events])
    return (
        <div>
            <div>
                {events.map((event)=>(event.title))}
            </div>
            <button onClick={loadMore}>Load More</button>
        </div>);
}