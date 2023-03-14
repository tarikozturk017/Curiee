import Link from "next/link"
import { userIdAtom } from "../Layout";
import { atom, useAtom } from 'jotai';
import useSWR from 'swr';
import { useEffect } from "react";

const userAtom = atom({});
const PatientSideBar = () => {
    const [userId] = useAtom(userIdAtom)
    const [therapist, setTherapist] = useAtom(userAtom)
    // console.log(userId)
    useEffect(() => {
        if (userId) {
            const fetchTherapist = async () => {
            const res = await fetch(`http://localhost:3001/therapist/${userId}`);
            const data = await res.json();
            setTherapist(data);
          };
    
          fetchTherapist();
        }
      }, [userId]);

      if (!userId) {
        return null;
      }
    
      if (!therapist) {
        return <div>Loading...</div>;
      }

    // if (userId) {
    //     useSWR(`http://localhost:3001/therapist/${userId}`, async (url) => {
    //       const res = await fetch(url)
    //       const data = await res.json();
    //       setTherapist(data);
    //     })
    //   }
    // setTherapist(t)
    // console.log(p)

    return (
        <>
        { therapist && (<div className=" p-10 text-white bg-slate-900 h-screen absolute min-w-min w-1/6 pt-5" >
            <p className=" m-5 text-center text-xl">{therapist.firstName + ' ' + therapist.lastName}</p>
            <hr />
            <ul className=" mt-10 flex flex-col gap-5">
                <li><Link href="/therapist/dashboard">Dashboard</Link></li>
                <li><Link href="/patients">My Patients</Link></li>
                <li><Link href="/treatments">Explore Treatments</Link></li>
                <li><Link href="/treatment/new">Create New Treatment</Link></li>
                <li><Link href="/therapist/findPatient">Find Your Patient</Link></li>
            </ul>
        </div>)
        }
        </>
    )
}

export default PatientSideBar
export { userAtom };
