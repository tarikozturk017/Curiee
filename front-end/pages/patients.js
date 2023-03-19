import Link from 'next/link'
// import useSWR from 'swr'
import { useAtom } from 'jotai'
// import { userIdAtom } from '@/components/Layout'
import { userAtom } from '@/components/therapist/SideBar'
import { useState, useEffect } from 'react';
// import Auth from '@/utils/auth'

// getStaticProps is a Next.js function that is used to pre-render static pages at build time. 
// It is typically used for pages that do not require frequently changing data, such as blog posts or 
// product pages. getStaticProps fetches data at build time and passes it as props to the page component. 
// This makes the page load faster and improves SEO.


const Patients = () => {
  // const [therapistId] = useAtom(userIdAtom);
  const [therapist] = useAtom(userAtom);
  const [therapistData, setTherapistData] = useState(therapist)
  const [displayActivePatients, setDisplayActivePatients] = useState(true);

  // console.log(`sidebar therapist retrieved by atom ${therapist.patients[0].firstName}`)
  // const { data: patients, error } = useSWR(`http://localhost:3001/patient/myPatients?therapistId=${therapistId}`, async (url) => {
  //   const res = await fetch(url)
  //   return res.json()
  // })

  useEffect(() => {
    if (therapist._id) {
        const fetchTherapist = async () => {
        const res = await fetch(`http://localhost:3001/therapist/${therapist._id}`);
        const data = await res.json();
        setTherapistData(data);
      };

      fetchTherapist();
    }
  }, [displayActivePatients]);

  // if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load patients</div>
  // if (!patients) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>

  return (
    <>
    {therapistData.patients  && (<div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>
      <h1 className=' underline'>{displayActivePatients ? 'My Patients' : 'My Previous Patients'}</h1>
      <br />
      {displayActivePatients ? (
        <ul>
        {therapistData.patients.map((patient) => (
          // instead of id, one time token can be created to avoid insecurity
          <li key={patient._id}><Link href={"/patient/" + patient._id}>{patient.firstName} {patient.lastName}</Link></li>
        ))}
      </ul>
      ) 
      : (
        <ul>
        {therapistData.deactivatedPatients.map((patient) => (
          // instead of id, one time token can be created to avoid insecurity
          <li key={patient._id}><Link href={"/patient/" + patient._id}>{patient.firstName} {patient.lastName}</Link></li>
        ))}
      </ul>
      )}
    <button onClick={() => setDisplayActivePatients(!displayActivePatients)} 
          className=" bg-red-300 rounded-xl text-white" >
        {displayActivePatients ? 'Display My Previous Patients' : 'Display My Current Patients'}
    </button>
    </div>)}
    </>
  );
}

export default Patients;