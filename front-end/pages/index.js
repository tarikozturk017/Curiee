import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const jwt = require('jsonwebtoken');

const Home = () => {
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
      <main className=' h-screen bg-gradient-to-tr from-cyan-300 to-blue-300'>
      </main>
    </>
  )
}

export default Home;