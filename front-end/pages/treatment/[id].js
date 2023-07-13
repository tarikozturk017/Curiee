import {useRouter} from 'next/router';
import { useAtom } from 'jotai';
import { userIdAtom, userTypeAtom } from '@/components/Layout';
import { userAtom } from '@/components/therapist/SideBar';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error'; 
import { BsFillHeartFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import Rate from '@/components/treatment/Rate';
import TreatmentSatisfaction from '@/components/treatment/TreatmentSatisfaction';
import Card from '@/components/page/Card';
import Header from '@/components/page/Header';

// Patient will be able to ask permission to 
// do exercise || or suggestion to 
// do the exercise to the therapist

// Integrate OpenAI to inform about diseases!

const Treatment = () => {
    // TODO: check if the treatment in the fav list therapist -> handle
    const [userId] = useAtom(userIdAtom)
    const [userType] = useAtom(userTypeAtom)
    
    const [therapist, setTherapist] = useState()
    const [patient, setPatient] = useState()

    const router = useRouter();
    const { id } = router.query;
    const [added, setAdded] = useState(false);
    const [display, setDisplay] = useState()
    const [satisfactionKey, setSatisfactionKey] = useState(0); // State to trigger re-render TreatmentSatisfaction


    useEffect(() => {
        if (userId && userType == 'therapist') {
            setDisplay(true)
            const fetchTherapist = async () => {
                const res = await fetch(`http://localhost:3001/therapist/${userId}`);
                const data = await res.json();
                setTherapist(data);
            };
    
            fetchTherapist();
        } else if(userId && userType == 'patient') {
            const fetchPatient = async () => {
                const res = await fetch(`http://localhost:3001/patient/${userId}`);
                const data = await res.json();
                setPatient(data);
            };
    
            fetchPatient();
        }
    }, [userId]);
        
    useEffect(() => {
        if (userType == 'patient'){
            if (patient?.favExercises?.find(exercise => exercise === id)) {
                setAdded(true);
            }
            patient?.exercises.map((exercise) => {
                if (exercise.exercise._id == id)  setDisplay(true)
            })
        }

        if (therapist?.favExercises?.find(exercise => exercise._id === id)) {
          setAdded(true);
        }
        
    }, [patient, therapist]);

    const { data, error } = useSWR(`http://localhost:3001/exercise/${id}`);

    if (data == undefined || data == null)  return null
    if (data.length==0)  return null
    

    const handleFavorite = async () => {
        if (userType == 'therapist'){
            try {
            //sendTherapistRequest
            const response = await fetch(`http://localhost:3001/therapist/addTreatmentToFav`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, id })
            
        });
        if(response) {
            console.log(response.status)
            setAdded(!added);
        }
        } catch (error) {
            console.error(error);
        }
        } else if (userType == 'patient') {
            try {
                //sendTherapistRequest
                const response = await fetch(`http://localhost:3001/patient/addTreatmentToFav`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, id })
                
            });
            if(response) {
                console.log(response.status)
                setAdded(!added);
            }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Card>
            
        <Header headline={data.title} subtext={`Description: ${data.description}`}/>
        <div className='text-center w-2/4 mx-auto'>
            <h1>{data.title}</h1>
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
            <div onClick={handleFavorite} className=' mx-auto w-32 flex justify-around'>
                {!added ? <span className=' italic text text-sm'>Add to your favorite</span> :
                <span className=' italic text text-sm'>Already favorited</span>
                }
                <BsFillHeartFill className='flex'/>
            </div>
            {display && <Rate treatmentId={id} 
                onRateSubmitted={() => setSatisfactionKey((prevKey) => prevKey + 1)} // Update the satisfactionKey to trigger re-render
            />}
            <TreatmentSatisfaction treatmentId={id} key={satisfactionKey}/>
        </div>
        </Card>
    )
}

export default Treatment;