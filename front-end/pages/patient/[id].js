import { useRouter } from "next/router";
import Link from "next/link";
import config from "@/src/config";
import useSWR from "swr";
import Error from "next/error";
import { useState, useEffect } from "react";
import AssignTreatment from "@/components/therapist/AssignTreatment";
import DeactivatePatient from "@/components/therapist/DeactivatePatient";
import ActivatePatient from "@/components/therapist/ActivatePatient";
import { useAtom } from "jotai";
import { userAtom } from "@/components/therapist/SideBar";
import Card from "@/components/page/Card";
import Header from "@/components/page/Header";
import Table from "@/components/page/Table";

// To achieve on hover extra content -> flowbite library included
// plugins added and content added to tailwind config
// necessary script added to body tag
// documantation -> https://flowbite.com/docs/getting-started/quickstart/

const Patient = () => {
  const [therapistData] = useAtom(userAtom);
  const [displayForm, setDisplayForm] = useState(false);
  const [data, setData] = useState();

  const handleNewTreatment = () => {
    setDisplayForm(true);
  };

  const router = useRouter();
  let id;
  if (router) {
    id = router.query.id;
  }

  useEffect(() => {
    if (displayForm == false && id !== undefined) {
      const fetchPatients = async () => {
        const res = await fetch(`${config.apiBaseUrl}/patient/${id}`);
        const data = await res.json();
        setData(data);
      };

      fetchPatients();
    }
  }, [displayForm, id]);

  const tableHeader = (
    <tr>
      <th scope="col" className="px-6 py-3">
        Treatment
      </th>
      <th scope="col" className="px-6 py-3">
        Repetition
      </th>
    </tr>
  );

  const tableBody =
    data?.exercises?.length > 0 ? (
      data.exercises.map((exercise) => (
        <tr className="hover:bg-slate-500 transition" key={exercise._id}>
          {exercise.exercise && (
            <>
              <th scope="row" className="">
                <Link href={"/treatment/" + exercise.exercise._id}>
                  <span className="hover:text-slate-200">
                    {exercise.exercise.title}
                  </span>
                </Link>
              </th>
              <td className="p-1">
                {exercise.repetition} {!exercise.repetition && "N/A"}
              </td>
            </>
          )}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="2">
          No exercises assigned to {data?.firstName} {data?.lastName}
        </td>
      </tr>
    );

  if (!data)
    return (
      <div className=" mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center">
        Loading...
      </div>
    );
  return (
    <Card>
      {!data?.profilePictureLink && (
        <img
          src="https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
          className="w-32 mx-auto rounded-full shadow-xl shadow-blue-400/40 mb-8"
          alt="Avatar"
        />
      )}

      {data?.profilePictureLink && (
        <img
          src={data?.profilePictureLink}
          className="w-32 rounded-full shadow-xl mx-auto shadow-blue-400/40"
          alt="Avatar"
        />
      )}
      <Header
        headline={`Patient: ${data.firstName} ${data.lastName}`}
        subtext={`Diagnosis: ${data.diagnosis ? data.diagnosis : "N/A"}`}
      />

      <div>
        <Table
          tableHeader={tableHeader}
          tableBody={tableBody}
          rowsPerPage={5}
        />

        {/* New treatment assignment to the patient */}

        <span className=" md:space-x-2 space-y-2">
          {!displayForm ? (
            // <button className=' bg-green-300 rounded-xl' onClick={handleNewTreatment}>Assign New Treatment</button>
            <button
              onClick={handleNewTreatment}
              className="rounded-full bg-green-600 p-2 px-4 text-white hover:bg-green-900"
            >
              Assign New Treatment
            </button>
          ) : (
            <AssignTreatment setDisplayForm={setDisplayForm} patientId={id} />
          )}
          {data.therapists.find(
            (p) => p._id.toString() === therapistData._id.toString()
          ) ? (
            <DeactivatePatient patientData={data} />
          ) : (
            <ActivatePatient patientData={data} />
          )}
        </span>
      </div>
      <div className=" lg:hidden h-24"></div>
    </Card>
  );
};

export default Patient;
