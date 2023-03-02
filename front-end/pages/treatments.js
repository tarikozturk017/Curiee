import Link from 'next/link'
import useSWR from 'swr'

const Treatments = () => {
    const { data: exercises, error } = useSWR('http://localhost:3001/exercises', async (url) => {
      const res = await fetch(url)
      return res.json()
    })
  
    if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load exercises</div>
    if (!exercises) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>
  
    return (
      <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
        <h1>Exercises</h1>
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise._id}><Link href={"/treatment/" + exercise._id}>{exercise.title}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Treatments;