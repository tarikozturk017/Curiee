// import Image from 'next/image'
import Card from "../Card";
import Rating from "../Rating";
import { useAtom } from "jotai";
import { userAtom } from "@/components/therapist/SideBar";
import useSWR from "swr";
import { useEffect, useState } from "react";
import TherapistSatisfaction from "./TherapistSatisfaction";
import config from "@/src/config";

const TherapistProfileBar = () => {
  const [therapist] = useAtom(userAtom);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  const toggleRightPanel = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
  };

  const { data: exercises, error } = useSWR(
    `${config.apiBaseUrl}/exercise/all`,
    async (url) => {
      const res = await fetch(url);
      return res.json();
    }
  );

  useEffect(() => {
    const countExercises = () => {
      if (exercises) {
        const exerciseCount = exercises.reduce((count, exercise) => {
          if (exercise.creator) {
            if (exercise.creator._id === therapist._id) {
              return count + 1;
            }
          }
          return count;
        }, 0);

        setExerciseCount(exerciseCount);
      }
    };

    countExercises();
  }, [exercises, therapist._id]);

  return (
    <>
      <div
        className="text-white flex-col text-xs md:text-sm lg:text-base h-screen max-h-screen absolute right-0 min-w-min w-1/6 pt-5 border-l-2 border-blue-100/25 border-double lg:inline-block hidden"
        style={{ backgroundColor: "rgba(44, 47, 72, 1)" }}
      >
        <div className=" flex">
          <div className="  text-center mx-auto">
            {/* {therapist?.profilePictureLink ? (
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                className="w-32 rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            ) : (
              <img
                src={therapist?.profilePictureLink}
                className="w-32 rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )} */}

            {therapist?.profilePictureLink && (
              <img
                src={therapist?.profilePictureLink}
                className="w-20 md:w-24 lg:w-28 rounded-full shadow-xl mx-auto shadow-blue-400/40"
                alt="Avatar"
              />
            )}
            {!therapist?.profilePictureLink && (
              <img
                src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                className="w-20 md:w-24 lg:w-28 rounded-full shadow-xl mx-auto shadow-blue-400/40"
                alt="Avatar"
              />
            )}

            <h5 className="mt-5 text-sm md:text-base lg:text-lg font-bold leading-tight">
              {therapist.firstName} {therapist.lastName}
            </h5>
            <p className="text-neutral-500 dark:text-neutral-400">
              {therapist?.occupation}
            </p>
          </div>
        </div>

        <div className=" mx-4">
          <div
            className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-sm md:text-base lg:text-lg underline mb-2">
              Patients
            </h1>
            <p>
              You have <span>{therapist.patients?.length ?? 0}</span> active
              patients.
            </p>
            <p>
              You treated{" "}
              <span>{therapist.deactivatedPatients?.length ?? 0}</span> patients
              so far.
            </p>
          </div>
          <div
            className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-sm md:text-base lg:text-lg underline mb-2">
              Treatments
            </h1>
            <p>
              You created <span>{exerciseCount}</span> treatment model.
            </p>
            <p>
              You have <span>{therapist.favExercises?.length ?? 0}</span>{" "}
              favorite model.
            </p>
          </div>
          <div
            className=" mx-auto min-w-full px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h1 className="text-sm md:text-base lg:text-lg underline mb-2">
              Performance
            </h1>
            {/* <Rating /> */}
            <TherapistSatisfaction therapistId={therapist._id} key={0} />
            <p>
              Your exercises liked{" "}
              <span>{therapist.patients?.length ?? 0}</span> times
            </p>
          </div>
        </div>
      </div>

      {!isRightPanelOpen ? (
        <div className=" absolute top-4  right-2  lg:hidden">
          <div
            className=" text-center mx-auto cursor-pointer"
            onClick={toggleRightPanel}
          >
            {!therapist?.profilePictureLink && (
              <img
                src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                className=" w-12 md:w-16 lg:w-24 mx-auto rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )}

            {therapist?.profilePictureLink && (
              <img
                src={therapist?.profilePictureLink}
                className="w-12 md:w-16 lg:w-24 rounded-full mx-auto shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
            )}
            <h5 className="mt-1 text-white text-sm md:text-base lg:text-lg font-bold leading-tight">
              {therapist.firstName} {therapist.lastName}
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
          </button>{" "}
          {/* right panel content */}
          <div className=" mt-12 flex lg:none">
            <div className=" text-center mx-auto">
              {!therapist?.profilePictureLink && (
                <img
                  src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                  className=" w-16 md:w-24 lg:w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40"
                  alt="Avatar"
                />
              )}

              {therapist?.profilePictureLink && (
                <img
                  src={therapist?.profilePictureLink}
                  className="w-16 md:w-24 lg:w-32 rounded-full shadow-xl shadow-blue-400/40"
                  alt="Avatar"
                />
              )}
              <h5 className="mt-5 text-sm md:text-base lg:text-lg font-bold leading-tight">
                {therapist.firstName} {therapist.lastName}
              </h5>
              <p className="text-neutral-500 dark:text-neutral-400">
                {therapist?.email}
              </p>
            </div>
          </div>
          <div className=" mx-1 xl:mx-4">
            <div
              className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 xl:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <h1 className="text-sm md:text-base lg:text-lg underline mb-3">
                Patients
              </h1>

              <p>
                <span className=" font-bold">
                  {therapist.patients?.length ?? 0}
                </span>{" "}
                active patients.
              </p>
              <p>
                You treated{" "}
                <span className=" font-bold">
                  {therapist.deactivatedPatients?.length ?? 0}
                </span>{" "}
                patients so far.
              </p>
            </div>
            <div
              className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 lg:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <h1 className="text-sm md:text-base lg:text-lg underline mb-3">
                Treatments
              </h1>

              <p>
                <span className=" font-bold">{exerciseCount}</span> treatment
                models created.
              </p>
              <p>
                <span className=" font-bold">
                  {therapist.favExercises?.length ?? 0}
                </span>{" "}
                favorite models.
              </p>
            </div>
            <div
              className=" mx-auto min-w-full px-1 xl:px-4 py-2 my-2 lg:my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <h1 className="text-sm md:text-base lg:text-lg underline mb-4">
                Performance
              </h1>
              <TherapistSatisfaction therapistId={therapist._id} key={0} />
              <p>
                Your exercises liked{" "}
                <span>{therapist.patients?.length ?? 0}</span> times
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TherapistProfileBar;
