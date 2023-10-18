import Link from "next/link";
import RealtimeEvents from "@/app/events/realtime-events";

export default async function Events() {
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Events List</h1>
          <div className="flex mt-4">
            <Link
              href={"/events/create"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create New Event
            </Link>
          </div>
        </div>

        <RealtimeEvents />
      </div>
    </div>
  );
}
