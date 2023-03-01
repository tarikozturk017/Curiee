import useSWR from 'swr'

// getStaticProps is a Next.js function that is used to pre-render static pages at build time. 
// It is typically used for pages that do not require frequently changing data, such as blog posts or 
// product pages. getStaticProps fetches data at build time and passes it as props to the page component. 
// This makes the page load faster and improves SEO.


const Patients = () => {
  const { data: patients, error } = useSWR('http://localhost:3001/patients', async (url) => {
    const res = await fetch(url)
    return res.json()
  })

  if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load patients</div>
  if (!patients) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>

  return (
    <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
      <h1>My Patients</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>{patient.firstName} {patient.lastName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;