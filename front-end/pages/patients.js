import Link from 'next/link'
// import useSWR from 'swr'
import { useAtom } from 'jotai'
// import { userIdAtom } from '@/components/Layout'
import { userAtom } from '@/components/therapist/SideBar'
import { useState, useEffect } from 'react';
import Card from '@/components/page/Card';
import Header from '@/components/page/Header';
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
    {therapistData.patients  && (
      <Card>
      <Header headline={`My Patients`} subtext={`List of your ${displayActivePatients ? 'active patients' : 
        'previous patients'}, please click on "${displayActivePatients ? 'Previous Patients' : 'Active Patients'}" 
        button to see your ${displayActivePatients ? 'previous' : 'active'} patients`}/>


<div className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg p-1 w-full m-0 pt-5 max-w-[50%] mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}>
<table className='w-full'>
  <thead className="" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
    <tr>
      <th scope="col" className="px-6 py-3">
        Name
      </th>
      <th scope="col" className="px-6 py-3">
        Age
      </th>
      <th scope="col" className="px-6 py-3">
        Disease
      </th>
      <th scope="col" className="px-6 py-3">
        Email
      </th>
    </tr>
  </thead>
  <tbody>
    {displayActivePatients ? (
      therapistData.patients.map((patient) => (
        <tr key={patient._id} className="">
          <th scope="row" className="">
            <Link href={"/patient/" + patient._id}>
              {patient.firstName} {patient.lastName}
            </Link>
          </th>
          
          <td className="px-6 py-4">
            00
          </td>
          <td className="px-6 py-4">
            {patient?.diagnosis}
          </td>
          <td className="px-6 py-4">
            {patient.email}
          </td>
        </tr>
      ))
    ) : (
      therapistData.deactivatedPatients.map((patient) => (
        <tr key={patient._id} className="">
          <th scope="row" className="">
            <Link href={"/patient/" + patient._id}>
              {patient.firstName} {patient.lastName}
            </Link>
          </th>
          <td className="px-6 py-4">
            00
          </td>
          <td className="px-6 py-4">
            {patient?.diagnosis}
          </td>
          <td className="px-6 py-4">
            {patient.email}
          </td>
            
        </tr>
      ))
    )}
  </tbody>
</table>

</div>

    {/* <div className=' text-center'>
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
    </div> */}
    <button onClick={() => setDisplayActivePatients(!displayActivePatients)} 
          className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500" >
        {displayActivePatients ? 'Previous Patients' : 'Active Patients'}
    </button>
    </Card>)}
    </>
  );
}

export default Patients;