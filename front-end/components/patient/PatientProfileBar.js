// import Image from 'next/image'
import { useAtom } from "jotai";
import { userAtom } from "@/components/patient/SideBar";
import { MdNotificationImportant } from "react-icons/md";
import Link from "next/link";

const PatientProfileBar = () => {
  const [patient] = useAtom(userAtom);
  // if (patient) console.log(patient.therapists[0]?.firstName)

  return (
    <>
      <div
        className="text-white flex-col h-screen absolute right-0 min-w-min w-1/6 pt-5 border-l-2 border-blue-100/25 border-double"
        style={{ backgroundColor: "rgba(44, 47, 72, 1)" }}
      >
        <div className=" flex">
          <div className=" my-5 text-center mx-auto">
            {!patient?.profilePictureLink && (
              <img
                src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                className="w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )}

            {patient?.profilePictureLink && (
              <img
                src={patient?.profilePictureLink}
                className="w-32 rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )}
            <h5 className="mt-5 text-xl font-medium leading-tight">
              {patient.firstName} {patient.lastName}
            </h5>
            <p className="text-neutral-500 dark:text-neutral-400">
              {patient?.email}
            </p>
          </div>
        </div>

        <div className=" mx-4">
          <div
            className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-xl underline mb-3">Treatment</h1>
            <p>
              You have <span>{patient.exercises?.length ?? 0}</span> treatments
              assigned.
            </p>
            <p>
              You have <span>{patient.favExercises?.length ?? 0}</span> favorite
              treatments.
            </p>
          </div>
          <div
            className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-xl underline mb-3">Therapist</h1>
            <p>Your active therapists:</p>
            <ul>
              {patient?.therapists?.map((therapist) => {
                return (
                  <li>
                    {therapist.firstName} {therapist.lastName}
                  </li>
                );
              })}
            </ul>
            <p>
              You have <span>{patient.pendingTherapists?.length ?? 0}</span>{" "}
              pending therapist requests.
            </p>
            <p>
              You worked with{" "}
              <span>{patient.previousTherapists?.length ?? 0}</span> therapists
              before.
            </p>
          </div>
          <div
            className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-xl underline mb-4">Diagnosis</h1>
            <p>
              Your current diagnosis: <span>{patient?.diagnosis}</span>.
            </p>
          </div>

          {patient.pendingTherapists?.length > 0 && (
            <div className=" bg-red-500/40 rounded p-1">
              <Link className="justify-around flex" href="/patient/myTherapist">
                <MdNotificationImportant className=" text-xl" />
                <p>{patient.pendingTherapists?.length} pending request(s).</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientProfileBar;
