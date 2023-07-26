import { useState, useEffect } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti'
import { useAtom } from 'jotai';
import Link from 'next/link';
import { userIdAtom } from '@/components/Layout';
import useSWR from 'swr';
import Card from '@/components/page/Card';
import Header from '@/components/page/Header';

function MyTherapist() {
  const [patientId] = useAtom(userIdAtom)
  const [patient, setPatient] = useState()

  const { data: fetchedPatient } = useSWR(`http://localhost:3001/patient/${patientId}`, async (url) => {
    const res = await fetch(url)
    return res.json()
  })

  // Update the `patient` state with the fetched data
  useEffect(() => {
    if (fetchedPatient) {
      setPatient(fetchedPatient)
    }
  }, [fetchedPatient])

  const handleAccept = async (therapistId) => {
    try {
      //sendTherapistRequest
      const response = await fetch(`http://localhost:3001/patient/acceptTherapistRequest`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patientId, therapistId })

      });
      if (response.status === 200) {
        const data = await response.json();
        setPatient(data)
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleDecline = async (therapistId) => {
    try {
      //sendTherapistRequest
      const response = await fetch(`http://localhost:3001/patient/declineTherapistRequest`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patientId, therapistId })

      });
      if (response.status === 200) {
        const data = await response.json();
        setPatient(data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Card>
        <Header headline={`My Therapists`} subtext={'Find your active therapists below.'} />



        {patient?.exercises  && (
            // <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
            <div className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg p-1 w-full m-0 pt-5 max-w-[50%] mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}>
                <table className='w-full'>
                <thead className="" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
                <tr>
                    <th  className="px-6 py-3" >
                        Therapist Name
                    </th>
                    <th  className="px-6 py-3" >
                        Rate
                    </th>
                    
                </tr>
            </thead>
            <tbody>
            {patient.therapists.map((therapist) => (
                // <li key={therapist._id}> <Link href={"/therapist/" + therapist._id}>{therapist.firstName} {therapist.lastName}</Link></li>
            <tr key={therapist._id} className="">
                <th scope="row" className="">
                  <Link href={"/therapist/" + therapist._id}>{therapist.firstName} {therapist.lastName}</Link>
                </th>
                <td className="px-6 py-1">
                    {therapist.rateCount / therapist.totalRates} ({therapist.totalRates})   
                </td>
                {patient.therapists.length == 0 && 
                (<th key={therapist._id} className="">
                    
                </th>)}
            </tr>
            ))}
            </tbody>    
                </table>
            </div>)}


      </Card>
        {/* {patient.pendingTherapists.length > 0 ? (
          <>
            <h3>Pending Therapists:</h3>
            <ul>
              {patient.pendingTherapists.map((therapist) => (
                <li className=' flex justify-around' key={therapist._id}>
                  {therapist.firstName} {therapist.lastName} 
                  <span onClick={() => handleAccept(therapist._id)}><TiTick /></span>
                  <span onClick={() => handleDecline(therapist._id)}><TiTimes /></span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>You have no pending therapist request.</p>
        )} */}
    </>
  );
}

export default MyTherapist;
