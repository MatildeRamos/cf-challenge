"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function EventForm(){

    const router = useRouter();
    const [eventTitle, setEventTitle] = useState('');

    const handleEventTitleChange = (element: ChangeEvent<HTMLInputElement>) => {
        setEventTitle(element.target.value);
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
     
        try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {title: eventTitle})
     
        console.log(response);
        if (response){
            router.push('/');
        }

        } catch (e) {
            console.log(e);
        }
      }

    return (
        <div>
            <h1>Create New Event</h1>
            <form method="POST" onSubmit={onSubmit}>
                <div>
                <label>Title</label>
                <input type="text" name="title" value={eventTitle} onChange={handleEventTitleChange}/>
                </div>

                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}