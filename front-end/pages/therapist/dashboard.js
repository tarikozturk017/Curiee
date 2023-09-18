import { useAtom } from "jotai";
import { userAtom } from "@/components/therapist/SideBar";
import Card from "@/components/Card";
import PageCard from "@/components/PageCard";
import useSWR from "swr";
import { useEffect, useState } from "react";
import config from "@/src/config";

const Dashboard = () => {
  const [therapist] = useAtom(userAtom);
  const [exerciseCount, setExerciseCount] = useState(0);

  // console.log(therapist._id)
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
      {therapist && (
        // <div className=' mx-auto rounded-lg p-5 text-2xl bg max-w-max text-center'>
        <PageCard>
          {/* <h1 className=" text-2xl font-bold">DASHBOARD</h1> */}
          <Card>
            <div className=" bg-slate-200 p-5 rounded-xl text-black">
              <h1 className=" text-2xl  text-blue-100 font-burtons">
                {therapist.firstName} {therapist.lastName}
              </h1>
            </div>
            {!therapist?.profilePictureLink && (
              <img
                src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                className="w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40 mb-8"
                alt="Avatar"
              />
            )}

            {therapist?.profilePictureLink && (
              <img
                src={therapist?.profilePictureLink}
                className="w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40 mb-8"
                alt="Avatar"
              />
            )}
            <p className=" m-5 text-center text-blue-100 text-base italic">
              Welcome to your dashboard!
            </p>
            {/* </div> */}
          </Card>

          <div className=" grid grid-cols-1  md:grid-cols-3 text-sm xl:text-base  gap-1 md:gap-2 mt-4 lg:mt-10">
            {" "}
            <Card>
              <h1 className="text-xl p-5 text-orange-400 font-burtons md:mb-4 mb-1">
                Patients Chart
              </h1>
              <p>
                You have <span>{therapist.patients?.length ?? 0}</span> active
                patients.
              </p>
              <p>
                You treated{" "}
                <span>{therapist.deactivatedPatients?.length ?? 0}</span>{" "}
                patients so far.
              </p>
            </Card>
            <Card>
              <h1 className="text-xl p-5 text-orange-400 font-burtons mb-3">
                Treatments Chart
              </h1>
              <p>
                You created <span>{exerciseCount}</span> treatment model.
              </p>
              <p>
                You have <span>{therapist.favExercises?.length ?? 0}</span>{" "}
                favorite treatment model.
              </p>
            </Card>
            <Card>
              <h1 className="text-xl p-5 text-orange-400 font-burtons mb-3">
                Performance Chart
              </h1>
              {/* TODO */}
              <p>
                You have <span>{therapist.patients?.length ?? 0}</span> ratings.
              </p>
              <p>
                Your exercises liked{" "}
                <span>{therapist.patients?.length ?? 0}</span> times
              </p>
            </Card>
          </div>
          <div className=" lg:hidden h-24"></div>
        </PageCard>
      )}
    </>
  );
};

export default Dashboard;
