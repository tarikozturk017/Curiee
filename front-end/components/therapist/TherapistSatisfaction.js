import { useEffect, useState } from "react";
import config from "@/src/config";
import Rating from "../Rating";

const TherapistSatisfaction = ({ therapistId, key }) => {
  const [therapist, setTherapist] = useState();

  useEffect(() => {
    if (therapistId) {
      const fetchTreatment = async () => {
        const res = await fetch(
          `${config.apiBaseUrl}/therapist/${therapistId}`
        );
        const data = await res.json();
        setTherapist(data);
      };

      fetchTreatment();
    }
  }, [therapistId, key]);

  return (
    <>
      <p>
        <span className="font-bold">Satisfaction rate</span>
        {/* {!therapist?.totalRates
          ? " N/A"
          : therapist.rateCount / therapist.totalRates}{" "}
        <span>({therapist?.totalRates})</span> */}
      </p>
      <span className=" flex">
        <span className=" mx-auto my-2">
          {therapist?.totalRates && (
            <Rating rating={therapist.rateCount / therapist.totalRates} />
          )}
          {!therapist?.totalRates && <Rating rating={0} />}
        </span>
      </span>
    </>
  );
};

export default TherapistSatisfaction;
