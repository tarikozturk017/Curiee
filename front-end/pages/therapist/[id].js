import {useRouter} from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import Error from 'next/error'; 
import Rate from '@/components/therapist/Rate';
import TherapistSatisfaction from '@/components/therapist/TherapistSatisfaction';
import { userTypeAtom, userIdAtom } from '@/components/Layout';
import { useAtom } from 'jotai'


const Therapist = () => {
    const [userType] = useAtom(userTypeAtom)
    const [patientId] = useAtom(userIdAtom)
    const [satisfactionKey, setSatisfactionKey] = useState(0); // State to trigger re-render of TherapistSatisfaction


    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(`http://localhost:3001/therapist/${id}`);

    data?.patients?.some((patient) => patient._id === patientId);

    if (data == undefined || data == null)  return null
    if (data.length==0)  return(<Error statusCode={404} /> )
    
    return (
        <>
        <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
            <h1>{data.firstName} {data.lastName}</h1>
            <hr className=' border-black'/>
            <p>email: {data.email}</p>
            <p>Occupation: {data.occupation}</p>
            <ul>
                <p>favExercises:</p>
                {data.favExercises.map(exercise => {
                    <li key={exercise}>{exercise}</li>
                })}
            </ul>
            <p>Number of Patients: {data.patients.length}</p>
            {/* current patient can vote if the therapist's patient */}
            {data?.patients?.some((patient) => patient._id === patientId && userType=='patient') 
            && <Rate patientId={patientId} therapistId={id} 
                onRateSubmitted={() => setSatisfactionKey((prevKey) => prevKey + 1)} // Update the satisfactionKey to trigger re-render
            />}
            <TherapistSatisfaction therapistId={id} key={satisfactionKey}/>
        </div>
        </>
    )
}

export default Therapist;