import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { BsPersonFillAdd, BsPersonFillCheck } from 'react-icons/bs'
import { userIdAtom } from '../Layout';
const InfoCard = ({ patientData }) => {
    const [patientId, setPatientId] = useState(patientData._id)
    const [therapistId] = useAtom(userIdAtom)
    const [accepted, setAccepted] = useState()

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
    }, [patientData])

    return (
        <>
            <div>
                <h2>Patient Information</h2>
                <div className=" flex justify-around">
                    <p>Full Name: {patientData.firstName} {patientData.lastName}</p>
                    {!accepted ? <span onClick={addPatient}><BsPersonFillAdd /></span>
                    : <span onClick={addPatient}><BsPersonFillCheck /> 
                        <span className=' italic text-xs'>Already your patient</span> 
                    </span>}

                </div>
            </div>
        </>
    )
}

export default InfoCard;