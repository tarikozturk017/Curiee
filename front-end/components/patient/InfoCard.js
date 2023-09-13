import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  BsPersonFillAdd,
  BsPersonFillCheck,
  BsPersonFillDash,
  BsPersonFillX,
} from "react-icons/bs";
import { userIdAtom } from "../Layout";
import config from "@/src/config";

const InfoCard = ({ patientData }) => {
  const [patientId, setPatientId] = useState(patientData._id);
  const [therapistId] = useAtom(userIdAtom);
  const [accepted, setAccepted] = useState(false);
  const [pending, setPending] = useState(false);

  console.log(
    patientData.therapists.find(
      (p) => p._id.toString() === therapistId.toString()
    )
  );
  console.log(patientData.pendingTherapists.includes(therapistId.toString()));

  // const acceptedTherapist = patientData.therapists.find(p => p._id.toString() === therapist._id.toString());
  const addPatient = async () => {
    try {
      //sendTherapistRequest
      const response = await fetch(
        `${config.apiBaseUrl}/patient/sendTherapistRequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId, therapistId }),
        }
      );
      if (response) {
        console.log(response.status);
        if (response.status == 400) {
          // setPending(true)
        } else if (response.status == 402) {
          // setAccepted(true)
        }
        setAccepted(false);
        setPending(true);
        // setAccepted(patientData.therapists.find(p => p._id.toString() === therapistId.toString()))
        // setPending(patientData.pendingTherapists.includes(therapistId.toString()));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const withdrawRequest = async () => {
    try {
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
      // console.log('request canceled')
      if (response.status === 200) {
        const data = await response.json();
        // setPatient(data)
        console.log(data);
        console.log("request withdrawn");
        setPending(false);
        setAccepted(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAccepted(
      patientData.therapists.find(
        (p) => p._id.toString() === therapistId.toString()
      )
    );
    setPending(patientData.pendingTherapists.includes(therapistId.toString()));
  }, [patientData]);

  return (
    <>
      <div className="w-1/2 m-4 text-center text-indigo-200 mx-auto">
        <h2 className=" font-bold underline">Patient Found</h2>
        <div className=" flex justify-around">
          <p className=" justify-center text-lg">
            {" "}
            Full Name:{" "}
            <span className=" font-bold">
              {patientData.firstName} {patientData.lastName}
            </span>
          </p>
          {pending ? (
            <>
              <span className=" space-x-3 flex">
                <span className=" text-blue-200">
                  {" "}
                  <BsPersonFillDash className=" mx-auto text-xl" />
                  <p className=" italic text-xs">Pending request</p>
                </span>
                <span
                  className=" cursor-pointer duration-100 text-red-200 hover:text-red-400"
                  onClick={withdrawRequest}
                >
                  <BsPersonFillX className="mx-auto text-xl" />
                  <p className="italic text-xs"> Click to withdraw</p>
                </span>
              </span>
            </>
          ) : !accepted ? (
            <span
              className=" cursor-pointer duration-100 text-blue-200 hover:text-blue-400"
              onClick={addPatient}
            >
              <BsPersonFillAdd className="mx-auto text-xl" />
              <p className="italic text-xs"> Add</p>
            </span>
          ) : (
            <span>
              <BsPersonFillCheck className=" mx-auto text-xl" />
              <span className=" italic text-xs">Already your patient</span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoCard;
