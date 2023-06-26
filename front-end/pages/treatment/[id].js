import {useRouter} from 'next/router';
import { useAtom } from 'jotai';
import { userIdAtom } from '@/components/Layout';
import useSWR from 'swr';
import Error from 'next/error'; 
import { BsFillHeartFill } from "react-icons/bs";

const Treatment = () => {
    // TODO: check if the treatment in the fav list therapist || patient -> handle
    const [therapistId] = useAtom(userIdAtom)
    const router = useRouter();
    const { id } = router.query;
    
    const { data, error } = useSWR(`http://localhost:3001/exercise/${id}`);

    if (data == undefined || data == null)  return null
    if (data.length==0)  return(<Error statusCode={404} /> )
    

    // TODO: Therapist and Patients fav to be handled separately 
    const handleFavorite = async () => {
        try {
            //sendTherapistRequest
            const response = await fetch(`http://localhost:3001/therapist/addTreatmentToFav`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ therapistId, id })
            
        });
        if(response) {
            console.log(response.status)

        }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
            <h1>{data.title}</h1>
            <hr className=' border-black'/>
            <p><strong>Description: </strong> {data.description}</p>
            <p>
                <strong>Treatment use diseases: </strong>
                {data.diseaseTreatment && (
                    <>
                    {data.diseaseTreatment.map((disease) => (
                        <li key={disease}>{disease}</li>
                    ))}
                    </>
                )}
            </p>
            <div onClick={handleFavorite} className=' flex justify-around'>
                <span className=' italic text text-sm'>Add to your favorite  </span>
                <BsFillHeartFill className='flex'/>
            </div>
        </div>
        </>
    )
}

export default Treatment;