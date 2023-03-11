import Link from "next/link"
import { userIdAtom } from "../Layout";
import { atom, useAtom } from 'jotai';
import useSWR from 'swr';

const userAtom = atom({});
const PatientSideBar = () => {
    const [userId] = useAtom(userIdAtom)
    const [therapist, setTherapist] = useAtom(userAtom)
    // console.log(userId)
    
    
    const { data: t, error } = useSWR(`http://localhost:3001/therapist/${userId}`, async (url) => {
        const res = await fetch(url)
        // console.log(res)
        return res.json()
    })
    setTherapist(t)
    // console.log(p)

    return (
        <>
        { t && (<div className="  p-10 text-white bg-slate-900 h-screen absolute min-w-min w-1/6 pt-5" >
            <p className=" m-5 text-center text-xl">{t.firstName + ' ' + t.lastName}</p>
            <hr />
            <ul className=" mt-10 flex flex-col gap-5">
                <li><Link href="/therapist/dashboard">Dashboard</Link></li>
                <li><Link href="/patients">My Patients</Link></li>
                <li><Link href="/treatments">Explore Treatments</Link></li>
                <li><Link href="/treatment/new">Create New Treatment</Link></li>
            </ul>
        </div>)
        }
        </>
    )
}

export default PatientSideBar
export { userAtom };
