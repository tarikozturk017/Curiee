import Link from "next/link";
import { userIdAtom } from "../Layout";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiBody } from "react-icons/bi";
import { GiHealingShield } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Image from "next/image";
import config from "@/src/config";

const userAtom = atom({});

const PatientSideBar = () => {
  const [userId] = useAtom(userIdAtom);
  const [therapist, setTherapist] = useAtom(userAtom);

  const [hideSideBar, setHideSideBar] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchTherapist = async () => {
        const res = await fetch(`${config.apiBaseUrl}/therapist/${userId}`);
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

  return (
    <>
      {therapist && !hideSideBar && (
        <div
          className="w-1/6 h-screen absolute bg-gradient-to-tr from-slate-200 via-purple-300 to-violet-400"
          style={{ display: "inline-block" }}
        >
          <div
            className="border-r-2 border-blue-100/25 border-double p-10 text-white h-screen absolute w-full m-0 pt-5"
            style={{ backgroundColor: "rgba(44, 47, 72, 0.46)" }}
          >
            <p className="m-5 text-center text-xl">Explore</p>
            <hr />
            <ul className="mt-2 flex flex-col gap-5 ">
              <li className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                <BiBody className="text-xl md:text-2xl lg:text-3xl mr-2 min-w-[20px]" />
                <Link href="/patients">My Patients</Link>
              </li>
              <li className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                <GiHealingShield className="text-xl md:text-2xl lg:text-3xl mr-2 min-w-[20px]" />
                <Link href="/therapist/favoriteTreatments">
                  My Favorite Treatments
                </Link>
              </li>
              <li className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                <MdCreateNewFolder className="text-xl md:text-2xl lg:text-3xl mr-2 min-w-[20px]" />
                <Link href="/treatment/new">Create New Treatment</Link>
              </li>
              <li className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                <FaUserFriends className="text-xl md:text-2xl lg:text-3xl mr-2 min-w-[20px]" />
                <Link href="/therapist/findPatient">Connect Your Patient</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {therapist && hideSideBar && (
        <div className="p-5 absolute pt-5">
          <AiOutlineMenu
            onClick={() => setHideSideBar(false)}
            className="cursor-pointer text-black text-3xl"
          />
        </div>
      )}
    </>
  );
};

export default PatientSideBar;
export { userAtom };
