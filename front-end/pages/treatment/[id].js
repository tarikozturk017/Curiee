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


// Patient will be able to ask permission to 
// do exercise || or suggestion to 
// do the exercise to the therapist

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
        console.log(`new treatment id: ${id}`)
        if (userType == 'patient'){
            // if (!(patient?.exercises?.find(exercise => exercise.exercise._id === id))) {
            //     console.log(exercise.exercise._id)
            //     console.log(`NOT patient's exercise!`)
            //     setDisplay(false)
            // }
            // console.log(`new treatment id111: ${id}`)
            

            patient?.exercises.map((exercise) => {
                
                console.log(`new treatment id222: ${id}`)
                console.log(`patient's exercise id222: ${exercise.exercise._id}`)
                // console.log(id)
                // console.log(exercise.exercise._id)
                if (exercise.exercise._id == id){
                    console.log(`treatment id: ${id}`)
                    console.log(`patient's exercise id: ${exercise.exercise._id}`)
                    setDisplay(true)
                }
                if ((patient?.exercises?.find(exercise => exercise._id === id)) == false) {
                    console.log("not found")
                  }
            })
        }

        if (therapist?.favExercises?.find(exercise => exercise._id === id)) {
          setAdded(true);
        }
        
    }, [patient, therapist]);

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
            {display && <Rate treatmentId={id} />}
        </div>
        </>
    )
}

export default Treatment;