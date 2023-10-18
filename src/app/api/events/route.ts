import { createEvent, getEvents } from "@/firestore/events";
import { IEvent } from "@/types/events";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  let response;
  try {
    if (page) {
      response = await getEvents(+page);
    } else {
      response = await getEvents();
    }

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: "Could not get events" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const docRef = await createEvent(body as IEvent);
    return NextResponse.json(docRef?.id);
  } catch (e) {
    return NextResponse.json(
      { error: "Could not create event" },
      { status: 500 }
    );
  }
}
