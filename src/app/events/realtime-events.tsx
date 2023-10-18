"use client";
import { subscribeEvents } from "@/firestore/events";
import { IEvent, IEventPageInfo } from "@/types/events";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function RealtimeEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventPageInfo, setEventPageInfo] = useState<IEventPageInfo>({
    page: 1,
  });
  const pageStateRef = useRef<IEventPageInfo>();
  pageStateRef.current = eventPageInfo;

  const loadEvents = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
      { params: { page: eventPageInfo.page + 1 } }
    );
    const { data, pageInfo } = response.data;
    if (data?.length) {
      setEvents([...events, ...data]);
      setEventPageInfo(pageInfo);
    }
    return data;
  };

  useEffect(() => {
    const unsubscribe = subscribeEvents((data: IEvent[], limit: number) => {
      if (pageStateRef.current) {
        setEvents(data.slice(0, limit * pageStateRef.current.page));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {events.map((event) => (
        <div
          key={event.id}
          className="flex mb-4 items-center border-2 rounded p-2"
        >
          <div>
            <p>Title: {event.title}</p>
            <p>Date: {event.date?.toString()}</p>
            <p>Created At: {event.createdAt?.toString()}</p>
            <p>Status: {event.status}</p>
            <p>Hosts:</p>
            {event.hosts?.map((host) => (
              <div key={`${event.id}-${host.id}`} className="flex items-center">
                <Image
                  className="m-3"
                  width={50}
                  height={50}
                  src={host.avatar}
                  alt={host.name}
                />
                <p>{host.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        className="flex-no-shrink p-2 border-2 rounded"
        onClick={loadEvents}
      >
        Load More
      </button>
    </div>
  );
}
