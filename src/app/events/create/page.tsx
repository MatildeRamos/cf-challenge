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
     
            if (response){
                router.push('/');
            }

        } catch (e) {
            console.log(e);
        }
      }

    return (
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest">
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div className="mb-4">
                    <h1 className="text-grey-darkest">Create New Event</h1>
                </div>
                <div className="flex mb-4 items-center">
                <form method="POST" onSubmit={onSubmit} >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input type="text" name="title" value={eventTitle} onChange={handleEventTitleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"/>
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Add Event</button>
                </form>
                </div>
            </div>
        </div>
    );
}