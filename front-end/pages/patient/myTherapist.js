import { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti'
import { useAtom } from 'jotai';
import { userIdAtom } from '@/components/Layout';
import useSWR from 'swr';

function MyTherapist() {
  const [patientId] = useAtom(userIdAtom)
  const [patient, setPatient] = useState()

  const { data: fetchedPatient } = useSWR(`http://localhost:3001/patient/${patientId}`, async (url) => {
    const res = await fetch(url)
    return res.json()
  })

  if(patient) console.log(`patient: ${patient.firstName}`)

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

  return (
    <>
      {patient && <div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>

        {patient.therapists.length > 0 ? (
          <>
            <h3>Therapists:</h3>
            <ul>
              {patient.therapists.map((therapist) => (
                <li key={therapist._id}>
                  {therapist.firstName} {therapist.lastName}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>You have no therapist.</p>
        )}

        {patient.pendingTherapists.length > 0 ? (
          <>
            <h3>Pending Therapists:</h3>
            <ul>
              {patient.pendingTherapists.map((therapist) => (
                <li className=' flex justify-around' key={therapist._id}>
                  {therapist.firstName} {therapist.lastName} <span onClick={() => handleAccept(therapist._id)}><TiTick /></span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>You have no pending therapist.</p>
        )}
      </div>}
    </>
  );
}

export default MyTherapist;
