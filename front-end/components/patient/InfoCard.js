import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { BsPersonFillAdd, BsPersonFillCheck, BsPersonFillDash } from 'react-icons/bs'
import { userIdAtom } from '../Layout';
const InfoCard = ({ patientData }) => {
    const [patientId, setPatientId] = useState(patientData._id)
    const [therapistId] = useAtom(userIdAtom)
    const [accepted, setAccepted] = useState()
    const [pending, setPending] = useState()

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
            console.log(response)
        }
        } catch (error) {
        console.error(error);
        }
    }

    useEffect(() => {
        setAccepted(patientData.therapists.find(p => p._id.toString() === therapistId.toString()))
        // setPending(patientData.pendingTherapists.find(p => p._id.toString() === therapistId.toString()))
        // setPending(patientData.pendingTherapists.includes(therapistId.toString()));
        setPending(patientData.pendingTherapists.includes(therapistId.toString()));
        // console.log(patientData.pendingTherapists.find(p => p._id.toString() === therapistId.toString()));
        // console.log(patientData.pendingTherapists);

    }, [patientData])

    return (
        <>
            <div>
                <h2>Patient Information</h2>
                <div className=" flex justify-around">
                    <p>Full Name: {patientData.firstName} {patientData.lastName}</p>
                    {
                        pending ? <span> <BsPersonFillDash />
                            <span className=' italic text-xs'>Your request is pending</span> 
                            </span>
                        : !accepted ? <span onClick={addPatient}><BsPersonFillAdd /></span>
                        : <span onClick={addPatient}><BsPersonFillCheck /> 
                            <span className=' italic text-xs'>Already your patient</span> 
                        </span>
                    }

                </div>
            </div>
        </>
    )
}

export default InfoCard;