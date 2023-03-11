import { useAtom } from 'jotai';
import { userAtom } from '@/components/therapist/SideBar';


const Dashboard = () => {
    const [therapist] = useAtom(userAtom);
    
    return (
        <>
        {therapist && <div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>
            <h1 className=' underline'>{therapist.firstName} {therapist.lastName}</h1>
            <p className=" m-5 text-center text-xl">{therapist.firstName} {therapist.lastName}</p>
        </div>}
        </>
    );
}

export default Dashboard;
