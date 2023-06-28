import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { BsPersonFillAdd, BsPersonFillCheck, BsPersonFillDash, BsPersonFillX } from 'react-icons/bs'
import { userIdAtom } from '../Layout';
const InfoCard = ({ patientData }) => {
    const [patientId, setPatientId] = useState(patientData._id)
    const [therapistId] = useAtom(userIdAtom)
    const [accepted, setAccepted] = useState(false)
    const [pending, setPending] = useState(false)

    console.log(patientData.therapists.find(p => p._id.toString() === therapistId.toString()))
    console.log(patientData.pendingTherapists.includes(therapistId.toString()))

    // const acceptedTherapist = patientData.therapists.find(p => p._id.toString() === therapist._id.toString());
    const addPatient = async () => {
        try {
            //sendTherapistRequest
            const response = await fetch(`http://localhost:3001/patient/sendTherapistRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patientId, therapistId })
            
        });
        if(response) {
            console.log(response.status)
            if(response.status == 400) {
                // setPending(true)
            }
            else if( response.status == 402) {
                // setAccepted(true)
            }
            setAccepted(false)
            setPending(true)
            // setAccepted(patientData.therapists.find(p => p._id.toString() === therapistId.toString()))
            // setPending(patientData.pendingTherapists.includes(therapistId.toString()));
        }
        } catch (error) {
            console.error(error);
        }
    }

    const withdrawRequest = async () => {
        try {
          const response = await fetch(`http://localhost:3001/patient/declineTherapistRequest`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patientId, therapistId })
    
          });
        // console.log('request canceled')
          if (response.status === 200) {
            const data = await response.json();
            // setPatient(data)
            console.log(data)
            console.log('request withdrawn')
            setPending(false)
            setAccepted(false)
          }
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        setAccepted(patientData.therapists.find(p => p._id.toString() === therapistId.toString()))
        setPending(patientData.pendingTherapists.includes(therapistId.toString()));
    }, [])

    return (
        <>
            <div>
                <h2>Patient Information</h2>
                <div className=" flex justify-around">
                    <p>Full Name: {patientData.firstName} {patientData.lastName}</p>
                    {
                        pending ? <> <span> <BsPersonFillDash />
                            <span className=' italic text-xs'>Your request is pending</span> 
                            </span>
                            <span onClick={withdrawRequest}> <BsPersonFillX /></span>
                            </>
                        : !accepted ? <span onClick={addPatient}><BsPersonFillAdd /></span> 
                        : <span ><BsPersonFillCheck /> 
                            <span className=' italic text-xs'>Already your patient</span> 
                        </span>
                    }

                </div>
            </div>
        </>
    )
}

export default InfoCard;