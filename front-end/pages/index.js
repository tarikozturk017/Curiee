import Head from 'next/head'
import SideBar from './components/SideBar'

import TherapistPanel from './components/TherapistPanel'

export default function Home() {
  return (
    <>
      <Head>
        <title>Patient Management System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=' h-screen bg-gradient-to-tr from-cyan-300 to-blue-300'>
        <SideBar />
        <TherapistPanel />
      </main>
    </>
  )
}
