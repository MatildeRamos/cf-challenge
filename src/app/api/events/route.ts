import getEvents from "@/firebase/firestore/events";
import { IEvent } from "@/types/events";
import { NextResponse } from "next/server";

export async function GET(){
    const data = await getEvents() as IEvent[];

    return NextResponse.json(data);
}