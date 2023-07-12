import {useRouter} from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import Error from 'next/error'; 
import Rate from '@/components/therapist/Rate';
import TherapistSatisfaction from '@/components/therapist/TherapistSatisfaction';
import { userTypeAtom, userIdAtom } from '@/components/Layout';
import { useAtom } from 'jotai'
import Card from '@/components/page/Card';
import Header from '@/components/page/Header';
import {default as RegularCard} from '@/components/Card';


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
        <Card>
        <Header headline={'Explore Therapists'} subtext={`Occupation: ${data.occupation ? data.occupation : 'N/A'}`}/>
        
        <RegularCard>
        <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
            className="w-24 my-4 rounded-full shadow-xl shadow-blue-400/40 mx-auto"
            alt="Avatar"
          />
            <div className=' text-left m-2'>

                <p><span className=' font-bold'> email:</span> {data.email}</p>
                <ul>
                    <p><span className=' font-bold'>favExercises: </span> {data.favExercises.length == 0 && 'N/A'} </p>
                    {data.favExercises.map(exercise => {
                        <li key={exercise}>{exercise}</li>
                    })}
                </ul>
                <p><span className=' font-bold'>Number of Patients: </span>{data.patients.length}</p>
                {/* current patient can vote if the therapist's patient */}
                {data?.patients?.some((patient) => patient._id === patientId && userType=='patient') 
                && <Rate patientId={patientId} therapistId={id} 
                    onRateSubmitted={() => setSatisfactionKey((prevKey) => prevKey + 1)} // Update the satisfactionKey to trigger re-render
                />}
                <TherapistSatisfaction therapistId={id} key={satisfactionKey}/>
            </div>
        </RegularCard>
        </Card>
    )
}

export default Therapist;