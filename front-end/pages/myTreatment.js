import { useAtom } from "jotai"
import { userAtom } from "@/components/patient/SideBar"
import Link from "next/link"

const MyTreatment = () => {
    const [patient] = useAtom(userAtom)

    if (!patient.exercises) {return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>}
    return (
        <>
            {patient.exercises  && (<div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
                <ul>
                    <h1>Exercises</h1>
                    <ul>
                    {patient.exercises.map((e, index) => (
                        <li key={index}>
                            Treatment : <Link href={"/treatment/" + e.exercise._id}>{e.exercise.title}</Link> 
                            Reps: {e.repetition}   
                            Therapist's note: {e.note}   
                        </li>
                    ))}
                    </ul>
                </ul>
            </div>)}
        </>
    )
}

export default MyTreatment;