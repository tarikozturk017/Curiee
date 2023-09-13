import { useState, useEffect } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import { useAtom } from "jotai";
import Link from "next/link";
import { userIdAtom } from "@/components/Layout";
import useSWR from "swr";
import Card from "@/components/page/Card";
import Header from "@/components/page/Header";
import config from "@/src/config";

function MyTherapist() {
  const [patientId] = useAtom(userIdAtom);
  const [patient, setPatient] = useState();

  const { data: fetchedPatient } = useSWR(
    `${config.apiBaseUrl}/patient/${patientId}`,
    async (url) => {
      const res = await fetch(url);
      return res.json();
    }
  );

  // Update the `patient` state with the fetched data
  useEffect(() => {
    if (fetchedPatient) {
      setPatient(fetchedPatient);
    }
  }, [fetchedPatient]);

  const handleAccept = async (therapistId) => {
    try {
      //sendTherapistRequest
      const response = await fetch(
        `${config.apiBaseUrl}/patient/acceptTherapistRequest`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId, therapistId }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setPatient(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDecline = async (therapistId) => {
    try {
      //sendTherapistRequest
      const response = await fetch(
        `${config.apiBaseUrl}/patient/declineTherapistRequest`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId, therapistId }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setPatient(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <Header
          headline={`My Therapists`}
          subtext={"Find your active therapists below."}
        />

        {patient?.exercises && (
          // <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
          <div
            className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg p-1 w-full m-0 pt-5 max-w-[50%] mb-5"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.11)" }}
          >
            <table className="w-full">
              <thead
                className=""
                style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
              >
                <tr>
                  <th className="px-6 py-3">Therapist Name</th>
                  <th className="px-6 py-3">Rate</th>
                </tr>
              </thead>
              <tbody>
                {patient.therapists.map((therapist) => (
                  // <li key={therapist._id}> <Link href={"/therapist/" + therapist._id}>{therapist.firstName} {therapist.lastName}</Link></li>
                  <tr key={therapist._id} className="">
                    <th scope="row" className="">
                      <Link href={"/therapist/" + therapist._id}>
                        {therapist.firstName} {therapist.lastName}
                      </Link>
                    </th>
                    <td className="px-6 py-1">
                      {therapist.rateCount / therapist.totalRates} (
                      {therapist.totalRates})
                    </td>
                    {patient.therapists.length == 0 && (
                      <th key={therapist._id} className=""></th>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className=" mt-16">
          <Header
            headline={`Pending List`}
            subtext={"The therapists want to connect with you"}
          />
        </div>
        {patient?.pendingTherapists.length > 0 && (
          // <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
          <div
            className=" bg-blue-gray-600  shadow-lg shadow-blue-300/20 mx-auto rounded-lg p-1 w-full  m-0 pt-5 max-w-[30%] mb-5"
            // style={{ backgroundColor: "rgba(255, 25, 25, 0.21)" }}
          >
            <table className="w-full">
              <thead
                className=""
                style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
              >
                <tr>
                  <th className="px-6 py-3">Pending Therapist</th>
                  <th className="px-6 py-3">Accept/Decline</th>
                </tr>
              </thead>
              <tbody>
                {patient.pendingTherapists.map((therapist) => (
                  // <li key={therapist._id}> <Link href={"/therapist/" + therapist._id}>{therapist.firstName} {therapist.lastName}</Link></li>
                  <tr key={therapist._id} className="">
                    <th scope="row" className="">
                      <Link href={"/therapist/" + therapist._id}>
                        {therapist.firstName} {therapist.lastName}
                      </Link>
                    </th>
                    <td className="px-6 py-1 flex">
                      <span className="mx-auto flex gap-2">
                        <span onClick={() => handleAccept(therapist._id)}>
                          <TiTick className="hover:cursor-pointer hover:text-green-800 transition" />
                        </span>
                        <span onClick={() => handleDecline(therapist._id)}>
                          <TiTimes className="hover:cursor-pointer hover:text-red-800 transition" />
                        </span>
                      </span>
                    </td>

                    {/* <th scope="row" className="px-6 py-1" key={therapist._id}>
                  <Link href={"/therapist/" + therapist._id}>{therapist.firstName} {therapist.lastName}</Link>
                </th>
                <td className=' flex px-6 py-1'>

                  <span onClick={() => handleAccept(therapist._id)}><TiTick /></span>
                  <span onClick={() => handleDecline(therapist._id)}><TiTimes /></span>
                </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      {/* {patient.pendingTherapists.length > 0 ? (
          <>
            <h3>Pending Therapists:</h3>
            <ul>
              {patient.pendingTherapists.map((therapist) => (
                <li className=' flex justify-around' key={therapist._id}>
                  {therapist.firstName} {therapist.lastName} 
                  <span onClick={() => handleAccept(therapist._id)}><TiTick /></span>
                  <span onClick={() => handleDecline(therapist._id)}><TiTimes /></span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>You have no pending therapist request.</p>
        )} */}
    </>
  );
}

export default MyTherapist;
