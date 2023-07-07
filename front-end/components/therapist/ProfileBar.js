// import Image from 'next/image'
import Card from '../Card';
import Rating from '../Rating';

const ProfileBar = () => {
    return (
        <>
        
        <div className="text-white flex-col h-screen absolute right-0 min-w-min w-1/6 pt-5" style={{ backgroundColor: 'rgba(44, 47, 72, 1)' }}>
        <div className=" flex">
            <div className=" my-5 text-center mx-auto">
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                    class="w-32 rounded-full shadow-lg shadow-violet-400"
                    alt="Avatar" />
                <h5 class="mt-5 text-xl font-medium leading-tight">therapist NAME</h5>
                <p class="text-neutral-500 dark:text-neutral-400">Job</p>
            </div>
        </div>
        <Card>
            <h1 className='text-xl underline mb-3'>Patients</h1>
            <p>You have active 5 patients.</p>
            <p>You treated 123 patients so far.</p>
        </Card>
        <Card>
            <h1 className='text-xl underline mb-3'>Treatments</h1>
            <p>You have active 5 patients.</p>
            <p>You treated 123 patients so far.</p>
        </Card>
        <Card>
            <h1 className='text-xl underline mb-3'>Performance</h1>
            <Rating />
            <p>You have active 5 patients.</p>
            <p>You treated 123 patients so far.</p>
        </Card>
        </div>
        </>
    )
}

export default ProfileBar;