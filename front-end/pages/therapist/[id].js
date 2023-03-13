import {useRouter} from 'next/router';
import useSWR from 'swr';
import Error from 'next/error'; 


const Therapist = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(`http://localhost:3001/therapist/${id}`);

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
        </div>
        </>
    )
}

export default Therapist;