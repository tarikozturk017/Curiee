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
      {/* Light Mode color : from-violet-100 to-blue-100 */}
      {/* <main className=' h-screen bg-gradient-to-tr from-violet-100 to-blue-100'> */}
      {/* Dark Mode Color */}
      <main className=' h-screen from-gray-800 via-gray-600 to-gray-800 bg-gradient-to-r'>

      </main>
    </>
  )
}

export default Home;