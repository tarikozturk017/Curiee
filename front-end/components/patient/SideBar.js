import Link from "next/link"
import { userIdAtom } from "../Layout";
import { atom, useAtom } from 'jotai';
import useSWR from 'swr';

const userAtom = atom({});
const PatientSideBar = () => {
    const [patient, setPatient] = useAtom(userAtom)
    const [userId] = useAtom(userIdAtom)

    const { data: p, error } = useSWR(`http://localhost:3001/patient/${userId}`, async (url) => {
        const res = await fetch(url)
        const data = await res.json();
        setPatient(data); // Move the setPatient call inside the useSWR callback function
        return data;
    })

    return (
        <>
        { p && (<div className="  p-10 text-white bg-slate-900 h-screen absolute min-w-min w-1/6 pt-5" >
            <p className=" m-5 text-center text-xl">{p.firstName + ' ' + p.lastName}</p>
            <hr />
            <ul className=" mt-10 flex flex-col gap-5">
                <li><Link href="/patient/dashboard">Home</Link></li>
                <li><Link href="/myTreatment/">My Treatment</Link></li>
                <li><Link href="/treatments">Explore Treatments</Link></li>
                <li><Link href="/patient/myTherapist">My Therapist</Link></li>
            </ul>
        </div>)
        }
        </>
    )
}

export default PatientSideBar
export { userAtom };