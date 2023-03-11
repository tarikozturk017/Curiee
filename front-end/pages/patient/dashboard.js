import { atom, useAtom } from 'jotai';
import { userAtom } from '@/components/patient/SideBar';


const Dashboard = () => {
    const [patient] = useAtom(userAtom);
    
    return (
        <>
        {patient && <div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>
            <h1 className=' underline'>{patient.firstName} {patient.lastName}</h1>
            <p className=" m-5 text-center text-xl">{patient.firstName} {patient.lastName}</p>
        </div>}
        </>
    );
}

export default Dashboard;
