import {useRouter} from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error'; 
import { useState, useEffect } from 'react';
import AssignTreatment from '@/components/therapist/AssignTreatment';

const Patient = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const [data, setData] = useState()

    const handleNewTreatment = () => {
        setDisplayForm(true)
    }

    
    const router = useRouter();
    // console.log(router.query.id)
    let id;
    if(router) {id = router.query.id;}

    console.log(`id ${id}`)
    useEffect(() => {
        if (displayForm == false && id !== undefined) {
            console.log('fetching')
            const fetchPatients = async () => {
                const res = await fetch(`http://localhost:3001/patient/${id}`);
                const data = await res.json();
                setData(data);
            };
    
            fetchPatients();
        }
      }, [displayForm, id]);

    //   if (displayForm == false && id !== undefined) {
    //     console.log('fetching')
    //     const fetchPatients = async () => {
    //         const res = await fetch(`http://localhost:3001/patient/${id}`);
    //         const data = await res.json();
    //         setData(data);
    //     };

    //     fetchPatients();
    // }
    
    if (!data) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>
    return (
        <>
        <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
            <h1>{data.firstName} {data.lastName}</h1>
            <hr className=' border-black'/>
            <p><strong>Diagnosis: </strong> {data.diagnosis}</p>
            <div>
                <strong>Exercises: </strong>
                {data.exercises.length > 0 ? (
                    <>
                    {data.exercises.map((exercise) => (
                    <li key={exercise._id}>
                        {exercise.exercise && (
                        <Link href={"/treatment/" + exercise.exercise._id}>
                            <span>{exercise.exercise.title}</span>
                        </Link>
                        ) }
                        {exercise.repetition && <span>Repetition: {exercise.repetition}</span>}
                        {exercise.note && <span>Note: {exercise.note}</span>}
                    </li>
                    ))}

                    </>
                ) : (
                <span>No exercises assigned to {data.firstName} {data.lastName}</span>
                )}
                <br />
                {!displayForm ? 
                    <button onClick={handleNewTreatment}>Assign New Treatment</button>
                    : <AssignTreatment setDisplayForm={setDisplayForm} patientId={id}/>
                }
            </div>
        </div>
        </>
    )
}

export default Patient;