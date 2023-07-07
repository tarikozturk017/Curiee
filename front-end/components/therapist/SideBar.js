import Link from "next/link"
import { userIdAtom } from "../Layout";
import { atom, useAtom } from 'jotai';
// import useSWR from 'swr';
import { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai'

const userAtom = atom({});
const PatientSideBar = () => {
    const [userId] = useAtom(userIdAtom)
    const [therapist, setTherapist] = useAtom(userAtom)

    const [hideSideBar, setHideSideBar] = useState(false)
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
        
        { therapist && !hideSideBar && (
        // <div className=" p-10 text-white bg-slate-800 opacity-70 h-screen absolute min-w-min w-1/6 pt-5" >
        <div className="p-10 text-white h-screen absolute min-w-min w-1/6 pt-5" style={{ backgroundColor: 'rgba(44, 47, 72, 0.5)' }}>

            <div className=" flex flex-col mb-5">
              <AiOutlineMenu onClick={() => setHideSideBar(true)} className=" cursor-pointer self-end text-3xl" />
            </div>
            <p className=" m-5  text-center text-xl">{therapist.firstName + ' ' + therapist.lastName}</p>
            <hr />
            <ul className=" mt-10 flex flex-col gap-5">
                <li><Link href="/patients">My Patients</Link></li>
                <li><Link href="/therapist/favoriteTreatments">My Favorite Treatments</Link></li>
                <li><Link href="/treatment/new">Create New Treatment</Link></li>
                <li><Link href="/therapist/findPatient">Connect Your Patient</Link></li>
            </ul>
        </div>)
        
        }
        {(therapist && hideSideBar && 
        <div className=" p-5 absolute pt-5" >
        <AiOutlineMenu onClick={() => setHideSideBar(false)} className=" cursor-pointer text-black text-3xl" />
        </div>)}
        </>
    )
}

export default PatientSideBar
export { userAtom };
