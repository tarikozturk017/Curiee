import { useAtom } from 'jotai'
import { userTypeAtom } from '../Layout'
import TherapistProfileBar from '../therapist/TherapistProfileBar'
import PatientProfileBar from '../patient/PatientProfileBar'


const ProfileBar = () => {
    const [userType] = useAtom(userTypeAtom);
    return (
        <>
            {userType === 'patient' ? <PatientProfileBar /> : <TherapistProfileBar />}
        </>
    )
}

export default ProfileBar;