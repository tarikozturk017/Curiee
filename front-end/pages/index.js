import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
const jwt = require('jsonwebtoken');


const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);


  // const { data, error } = useSWR('http://localhost:3001/patient/all', (url) => fetch(url, {
  //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  // }).then(res => res.json()));



  useEffect(() => {
    
      
      const token = localStorage.getItem('token');

      if (token) {
      try {
          const decodedToken = jwt.decode(token);
          const patientId = decodedToken.patientId;
          if (patientId)  console.log(`patient ID: ${patientId}`);
          else {
            const therapistId = decodedToken.therapistId
            console.log(`therapist ID: ${therapistId}`);
          }
      } catch (error) {
          console.log('Invalid token', error);
      }
      } else {
          console.log('No token found');
      }

    
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/patient/login');
    }
  }, [router]);

  return (
    <>
      <main className=' h-screen bg-gradient-to-tr from-cyan-300 to-blue-300'>
      </main>
    </>
  )
}

export default Home;