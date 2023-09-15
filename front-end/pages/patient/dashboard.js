import { atom, useAtom } from "jotai";
import { userAtom } from "@/components/patient/SideBar";
import PageCard from "@/components/PageCard";
import Card from "@/components/Card";

const Dashboard = () => {
  const [patient] = useAtom(userAtom);

  return (
    <>
      {patient && (
        <PageCard>
          {/* <h1 className=" text-2xl font-bold">DASHBOARD</h1> */}
          <Card>
            <div className=" bg-slate-200 p-5 rounded-xl text-black">
              {!patient?.profilePictureLink && (
                <img
                  src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
                  className="w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40 mb-8"
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
              <h1 className=" text-2xl  text-blue-100 font-burtons">
                {patient.firstName} {patient.lastName}
              </h1>
            </div>

            <p className=" m-2 text-center text-blue-100 text-base italic">
              Welcome to your dashboard!
            </p>
            {/* </div> */}
          </Card>

          <div className=" flex  mt-10">
            <Card>
              <h1 className="text-xl p-5 text-orange-400 font-burtons mb-3">
                Treatment Chart
              </h1>
              <p>
                You have <span>{patient.exercises?.length ?? 0}</span>{" "}
                treatments assigned.
              </p>
              <p>
                You have <span>{patient.favExercises?.length ?? 0}</span>{" "}
                favorite treatments.
              </p>
            </Card>

            <Card>
              <h1 className="text-xl p-5 text-orange-400 font-burtons mb-3">
                Therapist Chart
              </h1>
              <p>You have {patient?.therapists?.length} active therapist.</p>
              <p>
                You have <span>{patient.pendingTherapists?.length ?? 0}</span>{" "}
                pending therapist requests.
              </p>
              <p>
                You worked with{" "}
                <span>{patient.previousTherapists?.length ?? 0}</span>{" "}
                therapists before.
              </p>
            </Card>

            <Card>
              <h1 className="text-xl p-5 text-orange-400 font-burtons mb-3">
                Diagnosis
              </h1>
              <p>
                You are diagnosed with <span>{patient?.diagnosis}</span>.
              </p>
              {/* TODO */}
              {/* <p>
                    You have <span>{therapist.patients?.length ?? 0}</span> ratings.
                  </p>
                  <p>
                    Your exercises liked{" "}
                    <span>{therapist.patients?.length ?? 0}</span> times
                  </p> */}
            </Card>
          </div>
        </PageCard>
      )}
    </>
  );
};

export default Dashboard;
