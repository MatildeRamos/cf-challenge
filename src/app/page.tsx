import getEvents from '@/firebase/firestore/events'
import Image from 'next/image'
import Events from './events/page';

export default function Home() {

  getEvents();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Events />
    </main>
  )
}
