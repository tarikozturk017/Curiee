require("dotenv").config();
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { userTokenAtom } from "@/components/Layout";
import { useAtom } from "jotai";

const jwt = require("jsonwebtoken");

const Home = () => {
  const [token] = useAtom(userTokenAtom);
  // const router = useRouter();

  // useEffect(() => {
  // const token = localStorage.getItem('token');

  //     if (token) {
  //     try {
  //         const decodedToken = jwt.decode(token);
  //         const patientId = decodedToken.patientId;
  //         if (patientId)  console.log(`patient ID: ${patientId}`);
  //         else {
  //           const therapistId = decodedToken.therapistId
  //           console.log(`therapist ID: ${therapistId}`);
  //         }
  //     } catch (error) {
  //         console.log('Invalid token', error);
  //     }
  //     } else {
  //         console.log('No token found');
  //     }

  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push('/login');
  //   }
  // }, [router]);

  return (
    <>
      {/* Light Mode color : from-violet-100 to-blue-100 */}
      {/* <main className=' h-screen bg-gradient-to-tr from-violet-100 to-blue-100'> */}
      {/* Dark Mode Color */}
      <main className=" h-screen from-gray-800 via-gray-600 to-gray-800 bg-gradient-to-r">
        <div className="flex items-center mt-16">
          <div className="flex mx-auto h-auto w-24 md:w-28 lg:w-36 xl:w-40">
            <Image
              src="/curie-home-guy.png"
              className=" w"
              width={200}
              height={200}
              alt="doctor"
            />
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-5xl my-auto text-blue-100 font-burtons font-bold ml-4">
              Welcome to Curiee!
            </p>
          </div>
        </div>

        <div className="flex items-center mt-16">
          <div className=" grid grid-cols-1 lg:grid-cols-2  mx-auto gap-2 md:gap-4 lg:gap-6 xl:gap-8">
            <div
              className="  px-2 md:px-2 lg:px-2 xl:px-4 py-2 my-5 rounded-md text-white  shadow-2xl shadow-blue-400/20 "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <p className="text-orange-400 px-8 md:px-12 lg:px-16 xl:px-20 text-center my-2 text-md md:text-lg lg:text-xl xl:text-2xl font-burtons font-bold">
                As a Patient
              </p>
              <ul className=" text-sm md:text-base lg:text-base xl:text-base text-white">
                <li>Explore the most effective treatments</li>
                <li>Find the best therapists</li>
                <li>Connect with your therapists</li>
                <li>Track your progress</li>
                <li>Rate your therapists and treatments</li>
              </ul>
            </div>
            <div
              className=" px-1 md:px-1 lg:px-2 xl:px-4 py-2 my-5 rounded-md text-white  max-w-max  shadow-2xl shadow-blue-400/20 "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <p className="text-orange-400 text-center my-2 text-md md:text-lg lg:text-xl xl:text-2xl font-burtons font-bold">
                As a Therapist
              </p>
              <ul className=" text-sm md:text-base lg:text-base xl:text-base text-white">
                <li>Promote your treatment models</li>
                <li>Create & Assign treatment to your patients</li>
                <li>Track your patients</li>
                <li>Improve your knowledge and skills</li>
                <li>Rate treatment models</li>
              </ul>
            </div>
          </div>
        </div>
        {!token && (
          <p className=" text-center text-sm md:text-base lg:text-lg text-white font-bold mt-12">
            <span>
              <Link
                className="hover:text-orange-400 transition-colors"
                href="/register"
              >
                Sign-up
              </Link>
            </span>{" "}
            and{" "}
            <span>
              <Link
                className="hover:text-orange-400 transition-colors"
                href="/login"
              >
                Login
              </Link>
            </span>{" "}
            to explore entire application!
          </p>
        )}
      </main>
    </>
  );
};

export default Home;
