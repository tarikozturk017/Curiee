import {useRouter} from 'next/router';
import useSWR from 'swr';
import Error from 'next/error'; 

const Treatment = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(`http://localhost:3001/exercise/${id}`);

    if (data == undefined || data == null)  return null
    if (data.length==0)  return(<Error statusCode={404} /> )

    return (
        <>
        <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
            <h1>{data.title}</h1>
            <hr className=' border-black'/>
            <p><strong>Description: </strong> {data.description}</p>
            <p>
                <strong>Treatment use diseases: </strong>
                {data.diseaseTreatment.length > 0 ? (
                    <>
                    {data.diseaseTreatment.map((disease) => (
                        <li key={disease}>{disease}</li>
                    ))}
                    </>
                ) : (
                <span>No disease treatment assigned to {data.title}</span>
                )}
            </p>
        </div>
        </>
    )
}

export default Treatment;