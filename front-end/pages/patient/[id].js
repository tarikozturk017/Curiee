import {useRouter} from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error'; 
import { useState, useEffect } from 'react';
import AssignTreatment from '@/components/therapist/AssignTreatment';
import DeactivatePatient from '@/components/therapist/DeactivatePatient';
import ActivatePatient from '@/components/therapist/ActivatePatient';
import { useAtom } from 'jotai';
import { userAtom } from '@/components/therapist/SideBar';

const Patient = () => {
    const [therapistData] = useAtom(userAtom)
    const [displayForm, setDisplayForm] = useState(false);
    const [data, setData] = useState()

    const handleNewTreatment = () => {
        setDisplayForm(true)
    }
    
    const router = useRouter();
    let id;
    if(router) {id = router.query.id;}

    useEffect(() => {
        if (displayForm == false && id !== undefined) {
            const fetchPatients = async () => {
                const res = await fetch(`http://localhost:3001/patient/${id}`);
                const data = await res.json();
                setData(data);
            };
    
            fetchPatients();
        }
      }, [displayForm, id]);



    if(data)  {console.log(`patient id: ${data._id}, therapistID: ${therapistData._id}`)}

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
                {data.therapists.find(p => p._id.toString() === therapistData._id.toString()) ?
                <DeactivatePatient patientData={data}/>
                : <ActivatePatient patientData={data}/>
                }                
            </div>
        </div>
        </>
    )
}

export default Patient;