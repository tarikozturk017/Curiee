import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';
const jwt = require('jsonwebtoken');

import Head from 'next/head'
import SideBar from "./SideBar";
import Navbar from './Navbar';
import Footer from "./Footer";
import TherapistProfileBar from './therapist/TherapistProfileBar';
import ProfileBar from './page/ProfileBar';

// create the atom
const userIdAtom = atom('');
const userTypeAtom = atom('');
const userTokenAtom = atom('');

const protectedRoutes = ['/patients'];
const patientsOnlyRoutes = ['/patients'];

const Layout = (props) => {
  const [userId, setUserId] = useAtom(userIdAtom);
  const [userType, setUserType] = useAtom(userTypeAtom);
  const [userToken, seUserToken] = useAtom(userTokenAtom);
  const router = useRouter();

  useEffect(() => {
    if(userToken !== '') {
      try {
        const decodedToken = jwt.decode(userToken);
        let patientId;
        if(decodedToken){
          patientId = decodedToken.patientId;

          if (patientId) {
            setUserId(patientId);
            setUserType('patient');       
          } else {
            const therapistId = decodedToken.therapistId
            setUserId(therapistId);
            setUserType('therapist');
          }
        } 
      } catch (error) {
        console.log(error)
      }
    }
  }, [userToken]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log(`token: ${token}`)
    seUserToken(token)
    if (!token && protectedRoutes.includes(router.pathname)) {
      console.log('not logged in')
      router.push('/login');
    }
    if (userType != 'therapist' && patientsOnlyRoutes.includes(router.pathname)) {
      console.log('only patients can see')
      router.push('/');
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && protectedRoutes.includes(router.pathname)) {
      console.log('not logged in')
      router.push('/login');
    }
    if (userType != 'therapist' && patientsOnlyRoutes.includes(router.pathname)) {
      console.log('only patients can see')
      router.push('/');
    }
  }, [router]);

    return (
        <>
            <Head>

                <title>Patient Management System</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
              {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.css" rel="stylesheet" /> */}
            </Head>
            {/* <div className=" h-screen bg-gradient-to-tr from-violet-200 to-violet-400"> */}
            {/* <div className=" h-screen bg-gradient-to-b from-gray-800 to-gray-600 bg-gradient-to-r"> */}
            <div className=' h-screen from-gray-800 via-gray-600 to-gray-800 bg-gradient-to-r'>
            {/* <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> */}

            {/* if user logged in, display sidebar */}
            <Navbar className=' w-40'/>
            {userToken && <SideBar />}
            {userToken && <ProfileBar />}
            {/* <TherapistProfileBar /> */}
            <div className="flex-grow h-screen overflow-y-auto">

                {props.children}
            </div>

            </div>
            <Footer />
        </>
    )
}

export default Layout;
export { userIdAtom, userTypeAtom, userTokenAtom };