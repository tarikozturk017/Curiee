// import Image from 'next/image'
import { useAtom } from "jotai";
import { userAtom } from "@/components/patient/SideBar";
import { MdNotificationImportant } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

const PatientProfileBar = () => {
  const [patient] = useAtom(userAtom);
  // if (patient) console.log(patient.therapists[0]?.firstName)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  const toggleRightPanel = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
  };

  return (
    <>
      <div
        className="text-white text-xs md:text-sm lg:text-sm flex-col h-screen absolute right-0 min-w-min w-1/6 pt-5 border-l-2 border-blue-100/25 border-double lg:inline-block hidden"
        style={{ backgroundColor: "rgba(44, 47, 72, 1)" }}
      >
        <div className=" flex">
          <div className=" text-center mx-auto">
            {!patient?.profilePictureLink && (
              <img
                src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                className=" w-20 md:w-28 lg:w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )}

            {patient?.profilePictureLink && (
              <img
                src={patient?.profilePictureLink}
                className="w-20 md:w-28 lg:w-32 rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )}
            <h5 className="mt-5 text-sm md:text-base lg:text-lg font-bold leading-tight">
              {patient.firstName} {patient.lastName}
            </h5>
            <p className="text-neutral-500 dark:text-neutral-400">
              {patient?.email}
            </p>
          </div>
        </div>

        <div className=" mx-1 xl:mx-4">
          <div
            className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 xl:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-sm md:text-base lg:text-lg underline mb-3">
              Treatment
            </h1>
            <p>
              <span className="font-bold">
                {patient.exercises?.length ?? 0}
              </span>{" "}
              treatments assigned.
            </p>
            <p>
              <span className="font-bold">
                {patient.favExercises?.length ?? 0}
              </span>{" "}
              favorite treatments.
            </p>
          </div>
          <div
            className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 lg:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-sm md:text-base lg:text-lg underline mb-3">
              Therapist
            </h1>
            <p>Active therapists:</p>
            <ul>
              {patient?.therapists?.map((therapist) => {
                return (
                  <li className=" font-bold">
                    {therapist.firstName} {therapist.lastName}
                  </li>
                );
              })}
            </ul>
            <p>
              <span className=" font-bold">
                {patient.pendingTherapists?.length ?? 0}
              </span>{" "}
              pending therapist requests.
            </p>
            <p>
              Previous therapists are{" "}
              <span className=" font-bold">
                {patient.previousTherapists?.length ?? 0}
              </span>
            </p>
          </div>
          <div
            className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 lg:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-sm md:text-base lg:text-lg underline mb-4">
              Diagnosis
            </h1>
            <p>
              Diagnosis:{" "}
              <span className=" font-bold">{patient?.diagnosis}</span>.
            </p>
          </div>

          {patient.pendingTherapists?.length > 0 && (
            <div className=" bg-red-500/40 rounded p-1">
              <Link className="justify-around flex" href="/patient/myTherapist">
                <MdNotificationImportant className=" text-sm md:text-base lg:text-lg" />
                <p>{patient.pendingTherapists?.length} pending request(s).</p>
              </Link>
            </div>
          )}
        </div>
      </div>

      {!isRightPanelOpen ? (
        <div className=" absolute top-10 md:top-16 right-2 p-4 lg:hidden">
          <div
            className=" text-center mx-auto cursor-pointer"
            onClick={toggleRightPanel}
          >
            {!patient?.profilePictureLink && (
              <img
                src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                className=" w-16 md:w-20 lg:w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )}

            {patient?.profilePictureLink && (
              <img
                src={patient?.profilePictureLink}
                className="w-16 md:w-28 lg:w-32 rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )}
            <h5 className="mt-1 text-white text-sm md:text-base lg:text-lg font-bold leading-tight">
              {patient.firstName} {patient.lastName}
            </h5>
          </div>
        </div>
      ) : (
        <div
          className="text-white text-xs md:text-sm lg:text-base flex-col absolute right-0 top-0 w-full h-full pt-5 border-l-2 border-blue-100/25 border-double lg:none"
          style={{ backgroundColor: "rgba(44, 47, 72, 1)" }}
        >
          <button
            onClick={toggleRightPanel}
            className="absolute top-2 right-2 text-gray-700"
          >
            <span className="text-3xl md:text-4xl text-white p-4">&times;</span>
          </button>
          {/* ...right panel content ... */}
          <div className=" mt-12 flex lg:none">
            <div className=" text-center mx-auto">
              {!patient?.profilePictureLink && (
                <img
                  src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                  className=" w-16 md:w-24 lg:w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40"
                  alt="Avatar"
                />
              )}

              {patient?.profilePictureLink && (
                <img
                  src={patient?.profilePictureLink}
                  className="w-16 md:w-24 lg:w-32 rounded-full shadow-xl shadow-blue-400/40"
                  alt="Avatar"
                />
              )}
              <h5 className="mt-5 text-sm md:text-base lg:text-lg font-bold leading-tight">
                {patient.firstName} {patient.lastName}
              </h5>
              <p className="text-neutral-500 dark:text-neutral-400">
                {patient?.email}
              </p>
            </div>
          </div>

          <div className=" mx-1 xl:mx-4">
            <div
              className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 xl:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <h1 className="text-sm md:text-base lg:text-lg underline mb-3">
                Treatment
              </h1>
              <p>
                <span className="font-bold">
                  {patient.exercises?.length ?? 0}
                </span>{" "}
                treatments assigned.
              </p>
              <p>
                <span className="font-bold">
                  {patient.favExercises?.length ?? 0}
                </span>{" "}
                favorite treatments.
              </p>
            </div>
            <div
              className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 lg:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <h1 className="text-sm md:text-base lg:text-lg underline mb-3">
                Therapist
              </h1>
              <p>Active therapists:</p>
              <ul>
                {patient?.therapists?.map((therapist) => {
                  return (
                    <li className=" font-bold">
                      {therapist.firstName} {therapist.lastName}
                    </li>
                  );
                })}
              </ul>
              <p>
                <span className=" font-bold">
                  {patient.pendingTherapists?.length ?? 0}
                </span>{" "}
                pending therapist requests.
              </p>
              <p>
                Previous therapists are{" "}
                <span className=" font-bold">
                  {patient.previousTherapists?.length ?? 0}
                </span>
              </p>
            </div>
            <div
              className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 lg:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <h1 className="text-sm md:text-base lg:text-lg underline mb-4">
                Diagnosis
              </h1>
              <p>
                Diagnosis:{" "}
                <span className=" font-bold">{patient?.diagnosis}</span>.
              </p>
            </div>

            {patient.pendingTherapists?.length > 0 && (
              <div
                onClick={toggleRightPanel}
                className=" bg-red-500/40 mx-auto rounded p-1 w-fit"
              >
                <Link
                  className="justify-around flex"
                  href="/patient/myTherapist"
                >
                  <MdNotificationImportant className=" text-sm md:text-base lg:text-lg" />
                  <p>{patient.pendingTherapists?.length} pending request(s).</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PatientProfileBar;
