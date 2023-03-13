import useSWR from 'swr'
import Link from 'next/link'
//http://localhost:3001/therapist/all

const Therapists = () => {
    
    const { data: therapists, error } = useSWR(`http://localhost:3001/therapist/all`, async (url) => {
        const res = await fetch(url)
        return res.json()
    })

    if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load patients</div>
    if (!therapists) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>

    return (
        <>
        <div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>
        <h1 className=' underline'>Therapists</h1>
        <br />
        <ul>
            {therapists.map((therapist) => (
            // instead of id, one time token can be created to avoid insecurity
            <li key={therapist._id}><Link href={"/therapist/" + therapist._id}>{therapist.firstName} {therapist.lastName}</Link></li>
            ))}
        </ul>
        </div>
        </>
    )
}

export default Therapists;