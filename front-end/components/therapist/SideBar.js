import Link from "next/link";
import { userIdAtom } from "../Layout";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiBody, BiDownArrowAlt } from "react-icons/bi";
import { GiHealingShield } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import { FaUserFriends, FaLongArrowAltLeft } from "react-icons/fa";
import Image from "next/image";
import config from "@/src/config";

const userAtom = atom({});

const PatientSideBar = () => {
  const [userId] = useAtom(userIdAtom);
  const [therapist, setTherapist] = useAtom(userAtom);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      {therapist && (
        <div>
          <div
            className="w-1/6 h-screen absolute bg-gradient-to-tr from-slate-200 via-purple-300 to-violet-400 lg:inline-block hidden"
            // style={{ display: "inline-block" }}
          >
            <div
              className="text-sm md:text-base w-20 inline-block my-4  hover:cursor-pointer rounded-full  pt-1 pb-0 text-white bg-gradient-to-t from-gray-700 via-gray-800 to-gray-800 shadow-xl shadow-blue-400/40 "
              // style={{ backgroundColor: "rgba(44, 47, 72, 0.46)" }}
            >
              <p className="m-5 text-center text-xl">My Panel</p>
              <hr />
              <ul className="mt-2 flex flex-col gap-5 ">
                <li className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                  <BiBody className="text-md md:text-xl lg:text-2xl mr-2 min-w-[20px]" />
                  <Link href="/patients">My Patients</Link>
                </li>
                <li className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                  <GiHealingShield className="text-md md:text-xl lg:text-2xl mr-2 min-w-[20px]" />
                  <Link href="/therapist/favoriteTreatments">
                    My Favorite Treatments
                  </Link>
                </li>
                <li className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                  <MdCreateNewFolder className="text-md md:text-xl lg:text-2xl mr-2 min-w-[20px]" />
                  <Link href="/treatment/new">Create New Treatment</Link>
                </li>
                <li className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex">
                  <FaUserFriends className="text-md md:text-xl lg:text-2xl mr-2 min-w-[20px]" />
                  <Link href="/therapist/findPatient">
                    Connect Your Patient
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {!isSidebarOpen && (
            <button className="lg:hidden absolute top-0 right-0 left-0 ml-0 mr-0 text-gray-700">
              <span
                onClick={toggleSidebar}
                className="text-sm md:text-base w-20 inline-block my-4  hover:cursor-pointer rounded-full  pt-1 pb-0 text-white bg-gradient-to-t from-gray-700 via-gray-800 to-gray-800 shadow-xl shadow-blue-400/40 "
              >
                Expand Panel
                <span className=" flex">
                  <BiDownArrowAlt className=" text-base md:text-lg mx-auto" />
                </span>
              </span>
            </button>
          )}

          {isSidebarOpen && (
            <div
              className="w-full h-screen  absolute top-0 bg-gradient-to-tr from-slate-200 via-purple-300 to-violet-400 lg:inline-block"
              style={{ backgroundColor: "rgba(44, 47, 72, 0.46)" }}
            >
              <ul className=" font-bold text-lg md:text-xl mt-16 flex flex-col gap-5 ">
                <li
                  onClick={toggleSidebar}
                  className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex"
                >
                  <BiBody className="text-md md:text-xl lg:text-2xl mr-2 min-w-[20px]" />
                  <Link href="/patients">My Patients</Link>
                </li>
                <li
                  onClick={toggleSidebar}
                  className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex"
                >
                  <GiHealingShield className="text-md md:text-xl lg:text-2xl mr-2 min-w-[20px]" />
                  <Link href="/therapist/favoriteTreatments">
                    My Favorite Treatments
                  </Link>
                </li>
                <li
                  onClick={toggleSidebar}
                  className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex"
                >
                  <MdCreateNewFolder className="text-md md:text-xl lg:text-2xl mr-2 min-w-[20px]" />
                  <Link href="/treatment/new">Create New Treatment</Link>
                </li>
                <li
                  onClick={toggleSidebar}
                  className="hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex"
                >
                  <FaUserFriends className="text-md md:text-xl lg:text-2xl mr-2 min-w-[20px]" />
                  <Link href="/therapist/findPatient">
                    Connect Your Patient
                  </Link>
                </li>
                <li
                  onClick={toggleSidebar}
                  className=" hover:bg-black hover:opacity-70 rounded duration-300 hover:cursor-pointer p-3 flex"
                >
                  {/* Responsive icon size with min-width */}
                  <FaLongArrowAltLeft className="mr-2 text-3xl min-w-[20px]" />{" "}
                  Back
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
      {/* {therapist && hideSideBar && (
        <div className="p-5 absolute pt-5">
          <AiOutlineMenu
            onClick={() => setHideSideBar(false)}
            className="cursor-pointer text-black text-3xl"
          />
        </div>
      )} */}
    </>
  );
};

export default PatientSideBar;
export { userAtom };
