import {useRouter} from 'next/router';
import { useAtom } from 'jotai';
import { userIdAtom } from '@/components/Layout';
import { userAtom } from '@/components/therapist/SideBar';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error'; 
import { BsFillHeartFill } from "react-icons/bs";
import { useEffect, useState } from 'react';


// Patient will be able to ask permission to 
// do exercise || or suggestion to 
// do the exercise to the therapist

const Treatment = () => {
    // TODO: check if the treatment in the fav list therapist -> handle
    const [therapistId] = useAtom(userIdAtom)
    // const [therapist] = useAtom(userAtom)
    const [therapist, setTherapist] = useState()
    const router = useRouter();
    const { id } = router.query;
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (therapistId) {
            const fetchTherapist = async () => {
            const res = await fetch(`http://localhost:3001/therapist/${therapistId}`);
            const data = await res.json();
            setTherapist(data);
          };
    
          fetchTherapist();
        }
    }, [therapistId]);
        
    useEffect(() => {
        if (therapist?.favExercises?.find(exercise => exercise._id === id)) {
          setAdded(true);
        }
        
    }, [therapist?.favExercises, id]);

    const { data, error } = useSWR(`http://localhost:3001/exercise/${id}`);

    if (data == undefined || data == null)  return null
    if (data.length==0)  return null
    

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
            setAdded(!added);
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
            {data.creator && <p><strong>Creator: </strong><Link href={"/therapist/" + data.creator._id}>{data.creator.firstName} {data.creator.lastName}</Link> </p>}
            {/* {<li key={data.creator._id}><Link href={"/therapist/" + data.creator._id}>{data.creator.firstName} {data.creator.lastName}</Link></li>} */}
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
                {!added ? <span className=' italic text text-sm'>Add to your favorite</span> :
                <span className=' italic text text-sm'>Already favorited</span>
                }
                <BsFillHeartFill className='flex'/>
            </div>
        </div>
        </>
    )
}

export default Treatment;