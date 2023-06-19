import { useAtom } from 'jotai';
import { userAtom } from '@/components/therapist/SideBar';
import Card from '@/components/Card';
import PageCard from '@/components/PageCard';

const Dashboard = () => {
    const [therapist] = useAtom(userAtom);
    
    return (
        <>
        {therapist && 
        // <div className=' mx-auto rounded-lg p-5 text-2xl bg max-w-max text-center'>
        <PageCard>
            <h1 className=' my-5 text-2xl font-bold'>DASHBOARD</h1>
            <Card>
                <div className=' bg-slate-200 p-5 rounded-xl text-black'>
                    <h1 className=' text-2xl font-semibold'>{therapist.firstName} {therapist.lastName}</h1>
                </div>
                <p className=" m-5 text-center text-base">Hello, welcome to the dashboard.</p>
            {/* </div> */}
            </Card>

            <div className=' flex mt-10'>
                <Card>
                    <h1 className=' text-2xl underline mb-3'>Patients Chart</h1>
                    <p>You have <span>{therapist.patients.length}</span> active patients.</p>
                    <p>You treated <span>{therapist.deactivatedPatients.length}</span> patients so far.</p>
                </Card>
                <Card>
                    <h1 className=' text-2xl underline mb-3'>Exercise Chart</h1>
                    <p>You created <span>{therapist.patients.length}</span> treatment model.</p>
                    <p>You have <span>{therapist.patients.length}</span> favorite treatment model.</p>
                </Card>
                <Card>
                    <h1 className=' text-2xl underline mb-3'>Patients Chart</h1>
                    <p>You have <span>{therapist.patients.length}</span> active patients.</p>
                    <p>asdasdsadadad</p>
                </Card>
            </div>
        </PageCard>
        }
        </>
    );
}

export default Dashboard;
