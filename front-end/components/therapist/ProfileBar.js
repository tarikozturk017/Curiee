// import Image from 'next/image'
import Card from '../Card';
import Rating from '../Rating';
import { useAtom } from 'jotai';
import { userAtom } from '@/components/therapist/SideBar';
import useSWR from 'swr'
import { useEffect, useState } from 'react';
import TherapistSatisfaction from './TherapistSatisfaction';



const ProfileBar = () => {
    const [therapist] = useAtom(userAtom);
    const [exerciseCount, setExerciseCount] = useState(0)

    const { data: exercises, error } = useSWR('http://localhost:3001/exercise/all', async (url) => {
        const res = await fetch(url)
        return res.json()
      })

      useEffect(() => {
        const countExercises = () => {
          if (exercises) {
            const exerciseCount = exercises.reduce((count, exercise) => {
            if(exercise.creator){
                if (exercise.creator._id === therapist._id) {
                  return count + 1;
                }
            }
              return count;
            }, 0);
        
            setExerciseCount(exerciseCount);
          }
        };
      
        countExercises();
      }, [exercises, therapist._id]);

    return (
        <>
        
        <div className="text-white flex-col h-screen absolute right-0 min-w-min w-1/6 pt-5 border-l-2 border-blue-100/25 border-double" 
        style={{ backgroundColor: 'rgba(44, 47, 72, 1)' }}
        >
        <div className=" flex">
            <div className=" my-5 text-center mx-auto">
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                    className="w-32 rounded-full shadow-xl shadow-blue-400/40"
                    alt="Avatar" />
                <h5 className="mt-5 text-xl font-medium leading-tight">{therapist.firstName} {therapist.lastName}</h5>
                <p className="text-neutral-500 dark:text-neutral-400">{therapist?.occupation}</p>
            </div>
        </div>

        <div className=' mx-4'>
        <div className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 " 
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
              <h1 className='text-xl underline mb-3'>Patients</h1>
              <p>You have <span>{therapist.patients?.length ?? 0}</span> active patients.</p>
              <p>You treated <span>{therapist.deactivatedPatients?.length ?? 0}</span> patients so far.</p>

          </div>
          <div className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 " 
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
              <h1 className='text-xl underline mb-3'>Treatments</h1>
              <p>You created <span>{exerciseCount}</span> treatment model.</p>
              <p>You have <span>{therapist.favExercises?.length ?? 0}</span> favorite model.</p>
          </div>
          <div className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 " 
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
              <h1 className='text-xl underline mb-4'>Performance</h1>
              <Rating />
              <TherapistSatisfaction therapistId={therapist._id} key={0}/>
              <p>Your exercises liked <span>{therapist.patients?.length ?? 0}</span> times</p>
          </div>
        </div>
        </div>
        </>
    )
}

export default ProfileBar;