import Link from 'next/link'
import useSWR from 'swr'
import { useAtom } from 'jotai'
import { userIdAtom } from '@/components/Layout'
// import Auth from '@/utils/auth'

// getStaticProps is a Next.js function that is used to pre-render static pages at build time. 
// It is typically used for pages that do not require frequently changing data, such as blog posts or 
// product pages. getStaticProps fetches data at build time and passes it as props to the page component. 
// This makes the page load faster and improves SEO.


const Patients = () => {
  const [userId] = useAtom(userIdAtom);

  console.log(`patientpage user id: ${userId}`);
  // console.log(patientId.constructor.name)


  const { data: patients, error } = useSWR('http://localhost:3001/patient/all', async (url) => {
    const res = await fetch(url)
    return res.json()
  })

  

  if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load patients</div>
  if (!patients) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>

  return (
    <div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>
      <h1 className=' underline'>My Patients</h1>
      <br />
      <ul>
        {patients.map((patient) => (
          // instead of id, one time token can be created to avoid insecurity
          <li key={patient._id}><Link href={"/patient/" + patient._id}>{patient.firstName} {patient.lastName}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;