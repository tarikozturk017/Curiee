import { useAtom } from "jotai";
import { userAtom } from "@/components/patient/SideBar";
import Link from "next/link";
import Card from "@/components/page/Card";
import Header from "@/components/page/Header";

const MyTreatment = () => {
  const [patient] = useAtom(userAtom);

  if (!patient.exercises) {
    return (
      <div className=" mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center">
        Loading...
      </div>
    );
  }
  return (
    <>
      <Card>
        <Header
          headline={`My Treatments`}
          subtext={"Find the treatments you were assigned below."}
        />
        {patient.exercises && (
          // <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
          <div
            className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg p-1 w-full m-0 pt-5 lg:max-w-[50%] mb-5"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.11)" }}
          >
            <table className="w-full">
              <thead
                className=""
                style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
              >
                <tr>
                  <th className="px-2 md:px-6 py-3 w-6 md:w-1/4">Treatment</th>
                  <th className="px-2 md:px-6 py-3 w-6 md:w-1/4">Repetition</th>

                  <th className="px-2 md:px-12 py-3 w-6 md:w-1/4">
                    Therapist's Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {patient.exercises.map((e, index) => (
                  <tr key={index} className="">
                    <th scope="row" className="">
                      <Link href={"/treatment/" + e.exercise._id}>
                        {e.exercise.title}
                      </Link>
                    </th>

                    <td className="px-2 md:px-6 py-1">{e?.repetition}</td>
                    <td className="px-2 md:px-6 py-1">{e?.note}</td>
                  </tr>
                ))}
              </tbody>

              {/* <ul>
                    <ul>
                    {patient.exercises.map((e, index) => (
                        <li key={index}>
                            Treatment : <Link href={"/treatment/" + e.exercise._id}>{e.exercise.title}</Link> 
                            Reps: {e.repetition}   
                            Therapist's note: {e.note}   
                        </li>
                    ))}
                    </ul>
                </ul> */}
            </table>
          </div>
        )}
      </Card>
    </>
  );
};

export default MyTreatment;
