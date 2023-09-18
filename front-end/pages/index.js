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
          <div className="flex-row md:flex mx-auto mt-12 h-auto w-28 md:w-32 lg:w-36 xl:w-40">
            <Image
              src="/curie-home-guy.png"
              className=" mb-4"
              width={200}
              height={200}
              alt="doctor"
            />
            <p className="text-xl text-center md:text-2xl lg:text-3xl xl:text-5xl my-auto text-blue-100 font-burtons font-bold ml-4">
              Welcome to Curiee!
            </p>
          </div>
        </div>

        {/* Demo instruction */}
        {/* <div
          class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p class="font-bold">Test Full Feature with:</p>
          <p class="text-sm">
            {" "}
            For <span className=" font-bold">Therapist:</span>email password
          </p>
          <p class="text-sm">
            For<span className=" font-bold">Patient</span>email password
          </p>
        </div>
 */}

        <div className="flex items-center mt-16">
          <div className=" grid grid-cols-1 md:grid-cols-2  mx-auto gap-2 md:gap-4 lg:gap-6 xl:gap-8">
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
                <li>Create & Assign treatment to patients</li>
                <li>Track your patients</li>
                <li>Improve your knowledge and skills</li>
                <li>Rate treatment models</li>
              </ul>
            </div>
          </div>
        </div>
        {!token && (
          <p className=" text-center mx-2 md:mx-6 text-sm md:text-base lg:text-lg text-white font-bold my-6 md:mt-12">
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
        <div className="flex">
          <div
            class="flex mx-auto flex-col md:w-1/2 lg:h-1/3 xl:w-1/4 p-4 mb-16 my-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <div className=" flex flex-row">
              <svg
                class="flex-shrink-0 inline w-4 h-4 mr-3 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div class="font-medium block">Test Full Feature with:</div>
            </div>
            <ul class="mt-1.5 ml-4 list-disc list-inside">
              <li>
                <span className=" font-bold">Therapist email: </span>
                david.smith@gmail.com{" "}
                <span className=" font-bold">password:</span> 123
              </li>
              <li>
                <span className=" font-bold">Patient email: </span>
                sarah.johnson@gmail.com{" "}
                <span className=" font-bold">password:</span> 123
              </li>
            </ul>
          </div>
        </div>

        <div className=" xl:hidden h-36"></div>
      </main>
    </>
  );
};

export default Home;
