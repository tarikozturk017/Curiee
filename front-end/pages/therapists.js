import useSWR from 'swr'
import Link from 'next/link'
import TherapistCard from '@/components/therapist/TherapistCard'
import Card from '@/components/page/Card'
import Header from '@/components/page/Header'
import { useState } from 'react'

//http://localhost:3001/therapist/all

const Therapists = () => {
    
    const { data: therapists, error } = useSWR(`http://localhost:3001/therapist/all`, async (url) => {
        const res = await fetch(url)
        return res.json()
    })

    const therapistsVar = therapists.map((therapist) => (
        <TherapistCard therapist={therapist}/>
    ))
    
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(therapists.length / 5) // 5 is max rows per page
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    const currentTherapists = therapistsVar.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load patients</div>
    if (!therapists) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>

    return (
        <Card>
        <Header headline={'Explore Therapists'} subtext={'You can explore the therapists.'}/>

        <div className=' text-center'>
        <br />
        <ul>
            {/* {therapists.map((therapist) => (
            // instead of id, one time token can be created to avoid insecurity
            // <li key={therapist._id}><Link href={"/therapist/" + therapist._id}>{therapist.firstName} {therapist.lastName}</Link></li>
            <TherapistCard therapist={therapist}/>
            ))} */}
            {currentTherapists}
        </ul>
        {totalPages > 1 && (
                <div className="flex justify-center mt-3">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="mr-2 px-2 py-1 bg-blue-500 text-white rounded-md">Prev</button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md">Next</button>
                </div>
            )}
        </div>
        </Card>
    )
}

export default Therapists;