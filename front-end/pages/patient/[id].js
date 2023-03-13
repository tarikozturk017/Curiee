import {useRouter} from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error'; 

// const Exercise = ({ exerciseId }) => {
//     const { data, error } = useSWR(`http://localhost:3001/exercise/${exerciseId}`);
  
//     if (error) return <>Error loading exercise details</>;
//     if (!data) return <>Loading exercise details...</>;

//     return <span>{data.title}</span>;
//   };

const Patient = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(`http://localhost:3001/patient/${id}`);

    if (data == undefined || data == null)  return null
    if (data.length==0)  return(<Error statusCode={404} /> )
    
    return (
        <>
        <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
            <h1>{data.firstName} {data.lastName}</h1>
            <hr className=' border-black'/>
            <p><strong>Diagnosis: </strong> {data.diagnosis}</p>
            <p>
                <strong>Exercises: </strong>
                {data.exercises.length > 0 ? (
                    <>
                    {data.exercises.map((exercise) => (
                        <li key={exercise.exercise}>
                            <Link href={"/treatment/" + exercise.exercise}>
                                <Exercise exerciseId={exercise.exercise} />
                            </Link>
                            {exercise.repetition && <p>Repetition: {exercise.repetition}</p>}
                            {exercise.repetition && <p>Note: {exercise.repetition}</p>}
                        </li>
                    ))}
                    </>
                ) : (
                <span>No exercises assigned to {data.firstName} {data.lastName}</span>
                )}
            </p>
        </div>
        </>
    )
}

export default Patient;