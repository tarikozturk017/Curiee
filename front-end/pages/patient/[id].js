import {useRouter} from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error'; 
import { useState, useEffect } from 'react';
import AssignTreatment from '@/components/therapist/AssignTreatment';
import DeactivatePatient from '@/components/therapist/DeactivatePatient';
import ActivatePatient from '@/components/therapist/ActivatePatient';
import { useAtom } from 'jotai';
import { userAtom } from '@/components/therapist/SideBar';
import Card from '@/components/page/Card';
import Header from '@/components/page/Header';
import Table from '@/components/page/Table';


// To achieve on hover extra content -> flowbite library included
// plugins added and content added to tailwind config 
// necessary script added to body tag
// documantation -> https://flowbite.com/docs/getting-started/quickstart/

const Patient = () => {
    const [therapistData] = useAtom(userAtom)
    const [displayForm, setDisplayForm] = useState(false);
    const [data, setData] = useState()

    const handleNewTreatment = () => {
        setDisplayForm(true)
    }
    
    const router = useRouter();
    let id;
    if(router) {id = router.query.id;}

    useEffect(() => {
        if (displayForm == false && id !== undefined) {
            const fetchPatients = async () => {
                const res = await fetch(`http://localhost:3001/patient/${id}`);
                const data = await res.json();
                setData(data);
            };
    
            fetchPatients();
        }
      }, [displayForm, id]);

      const tableHeader = (
        <tr>
            <th scope="col" className="px-6 py-3">
                Treatment
            </th>
            <th scope="col" className="px-6 py-3">
                Repetition
            </th>
        </tr>
      )

      const tableBody = (
        <>
            {data?.exercises.length > 0 ? (
            <>
                {data.exercises.map((exercise) => (
                <>
                    <tr className=' hover:bg-slate-500 transition ' key={exercise._id} >
                    {exercise.exercise && (
                        <>
                            <th scope="row" className="">
                                <Link href={"/treatment/" + exercise.exercise._id}>
                                    <span className='  hover:text-slate-200'>{exercise.exercise.title}</span>
                                </Link>
                            </th>
                            <td className="p-1">
                                {exercise.repetition} {!exercise.repetition && 'N/A'}
                            </td>
                        </>

                        )}
                    </tr>
                    
                </>
                ))}
            </>
            ) : (
            <span className=' mx-auto'>No exercises assigned to {data?.firstName} {data?.lastName}</span>
            )}
        </>
      )
      

    if (!data) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>
    return (
        <Card>
        <Header headline={`Patient: ${data.firstName} ${data.lastName}`} subtext={`Diagnosis: ${data.diagnosis ? data.diagnosis : 'N/A'}`}/>
        
            <div>
                <Table tableHeader={tableHeader} tableBody={tableBody} />
                
                {/* New treatment assignment to the patient */}
                
                <span className=' space-x-4'>
                    {!displayForm ? 
                        // <button className=' bg-green-300 rounded-xl' onClick={handleNewTreatment}>Assign New Treatment</button>
                        <button onClick={handleNewTreatment} className="rounded-full bg-green-600 p-2 px-4 text-white hover:bg-green-900">Assign New Treatment</button>
                        : <AssignTreatment setDisplayForm={setDisplayForm} patientId={id}/>
                    }
                    {data.therapists.find(p => p._id.toString() === therapistData._id.toString()) ?
                    <DeactivatePatient patientData={data}/>
                    : <ActivatePatient patientData={data}/>
                    }                
                </span>
            </div>
        </Card>
    )
}

export default Patient;