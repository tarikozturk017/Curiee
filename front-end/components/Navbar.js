import Link from "next/link";
import Logout from "./Logout";
import { atom, useAtom } from "jotai";
import { userTokenAtom, userTypeAtom } from "./Layout";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [token] = useAtom(userTokenAtom);
  const [type] = useAtom(userTypeAtom);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  // console.log(`TOKEN :::: ${token}`)

  const toggleMobileNavbar = () => {
    setIsMobileNavbarOpen(!isMobileNavbarOpen);
  };
  return (
    <>
      <nav className="bg-slate-800 w-full text-white p-3 border-b-4 border-blue-100/75 border-double lg:block hidden">
        <ul className="container flex flex-wrap items-center justify-evenly mx-auto ">
          <li className=" hover:text-orange-400 transition-colors hover:text-sky-200/80 duration-300 hover:cursor-pointer flex">
            <Link href="/">Home</Link>
          </li>
          <li className=" hover:text-orange-400 transition-colors hover:text-sky-200/80 duration-300 hover:cursor-pointer flex">
            <Link href="/about">About</Link>
          </li>
          <li className=" hover:text-orange-400 transition-colors hover:text-sky-200/80 duration-300 hover:cursor-pointer flex">
            <Link href="/treatments">Explore Treatments</Link>
          </li>
          <li className=" hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer flex">
            <Link href="/therapists">Explore Therapists</Link>
          </li>
          {token ? (
            <li className=" hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer flex">
              <Logout />
            </li>
          ) : (
            <li className=" hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer flex">
              <Link href="/login">Login</Link>
            </li>
          )}
          {/* {token ? <li><Link href="/therapist/dashboard">Profile</Link></li> 
                    :<li><Link href="/register">Register</Link></li>} */}
          {token ? (
            <li className=" hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer flex">
              <Link
                href={
                  type === "therapist"
                    ? "/therapist/dashboard"
                    : "/patient/dashboard"
                }
              >
                Profile
              </Link>
            </li>
          ) : (
            <li className=" hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer flex">
              <Link href="/register">Register</Link>
            </li>
          )}
        </ul>
      </nav>
      {/* Render the mobile menu when isOpen is true */}
      <div className="bg-slate-800 w-full p-4 text-white  lg:hidden block">
        {!isMobileNavbarOpen && (
          <li className="hover:text-orange-400 transition-colors hover:text-sky-200/80 duration-300 hover:cursor-pointer flex">
            <button onClick={toggleMobileNavbar}>
              <span className=" text-3xl md:text-4xl">&#9776;</span>
            </button>
          </li>
        )}
        {isMobileNavbarOpen && (
          <MobileNavbar
            isOpen={isMobileNavbarOpen}
            onClose={toggleMobileNavbar}
            token={token}
            type={type}
          />
        )}
      </div>
    </>
  );
};

export default Navbar;
