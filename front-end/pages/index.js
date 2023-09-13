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
          <div className="flex mx-auto">
            <Image
              src="/curie-home-guy.png"
              className=""
              width={200}
              height={200}
              alt="doctor"
            />
            <p className="text-5xl my-auto text-blue-100 font-burtons font-bold ml-4">
              Welcome to Curiee!
            </p>
          </div>
        </div>

        <div className="flex items-center mt-16">
          <div className="flex mx-auto gap-32">
            <div>
              <p className="text-orange-400 text-2xl font-burtons font-bold">
                As a Patient
              </p>
              <ul className=" text-lg text-blue-200">
                <li>Explore the most effective treatments</li>
                <li>Find the best therapists</li>
                <li>Connect with your therapists</li>
                <li>Track your progress</li>
                <li>Rate your therapists and treatments</li>
              </ul>
            </div>
            <div>
              <p className="text-orange-400 text-2xl font-burtons font-bold">
                As a Therapist
              </p>
              <ul className=" text-lg text-blue-200">
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
          <p className=" text-center text-lg text-blue-100 font-bold mt-12">
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
