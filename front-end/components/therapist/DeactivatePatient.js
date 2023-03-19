import { useAtom } from "jotai";
import { userAtom } from "./SideBar";
import { useRouter } from 'next/router';

const DeactivatePatient = ({ patientData }) => {
    const [therapistData, setTherapistData] = useAtom(userAtom)
    const router = useRouter();

    const handleClick = async () => {
        try {
            //sendTherapistRequest
            const response = await fetch(`http://localhost:3001/therapist/deactivatePatient`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patientId: patientData._id, therapistId: therapistData._id })
            
        });
        if(response) {
            console.log(response)
            router.push('/patients')
        }
        } catch (error) {
        console.error(error);
        }

        // console.log(`patient id: ${patientData._id}, therapist id: ${therapistData._id}`)
    }
        
    return (
        <>
            <button onClick={handleClick} className=" bg-red-800 rounded-xl text-white" >Deactivate Patient</button>
        </>
    )
}

export default DeactivatePatient;