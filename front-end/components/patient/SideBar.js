import Link from "next/link";
import { userIdAtom } from "../Layout";
import { atom, useAtom } from "jotai";
import useSWR from "swr";
import config from "@/src/config";

import { BiBody } from "react-icons/bi";
import { GiHealingShield } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const userAtom = atom({});

const PatientSideBar = () => {
  const [patient, setPatient] = useAtom(userAtom);
  const [userId] = useAtom(userIdAtom);

  const { data: p, error } = useSWR(
    `${config.apiBaseUrl}/patient/${userId}`,
    async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setPatient(data); // Move the setPatient call inside the useSWR callback function
      return data;
    }
  );

  return (
    <>
      {p && (
        <div
          className="w-1/6 h-screen absolute bg-gradient-to-tr from-slate-200 via-purple-300 to-violet-400 lg:inline-block hidden"
          // style={{ display: "inline-block" }}
        >
          <div
            className="border-r-2 border-blue-100/25 border-double p-10 text-white h-screen absolute w-full m-0 pt-5"
            style={{ backgroundColor: "rgba(44, 47, 72, 0.46)" }}
          >
            <p className="m-5 text-center text-xl">Explore</p>
            <hr />

            <ul className="mt-2 flex flex-col gap-5 ">
              <li className="text-sm md:text-base lg:text-lg hover:bg-black hover:opacity-70  rounded duration-300 hover:cursor-pointer p-3 flex">
                <BiBody className="text-base md:text-lg lg:text-xl mr-2 min-w-[20px]" />{" "}
                {/* Responsive icon size with min-width */}
                <Link href="/patient/dashboard">Home</Link>
              </li>
              <li className="text-sm md:text-base lg:text-lg hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                <GiHealingShield className="text-base md:text-lg lg:text-xl mr-2 min-w-[20px]" />{" "}
                {/* Responsive icon size with min-width */}
                <Link href="/myTreatment/">My Treatment</Link>
              </li>
              <li className="text-sm md:text-base lg:text-lg hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                <MdCreateNewFolder className="text-base md:text-lg lg:text-xl mr-2 min-w-[20px]" />{" "}
                {/* Responsive icon size with min-width */}
                <Link href="/patient/favoriteTreatments">
                  My Favorite Treatments
                </Link>
              </li>
              <li className="text-sm md:text-base lg:text-lg hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                <FaUserFriends className="text-base md:text-lg lg:text-xl mr-2 min-w-[20px]" />{" "}
                {/* Responsive icon size with min-width */}
                <Link href="/patient/myTherapist">My Therapist</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientSideBar;
export { userAtom };
