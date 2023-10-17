import { createEvent, getEvents } from "@/firebase/firestore/events";
import { IEvent, IEventPageInfo } from "@/types/events";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const url = new URL(request.url ?? '');
    const page = url.searchParams.get("page");
    let response: {data: IEvent[], pageInfo: IEventPageInfo};
    if (page){
        response = await getEvents(+page) as {data: IEvent[], pageInfo: IEventPageInfo};
    } else {
        response = await getEvents() as {data: IEvent[], pageInfo: IEventPageInfo};
    }

    return NextResponse.json(response);

}

export async function POST(request: NextRequest){
    const body = await request.json();
    const docRef = await createEvent(body as IEvent);
    return NextResponse.json(docRef?.id);
}
