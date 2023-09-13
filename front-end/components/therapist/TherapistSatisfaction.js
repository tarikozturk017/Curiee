import { useEffect, useState } from "react";
import config from "@/src/config";

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
        <span className="font-bold">Satisfaction rate: </span>
        {!therapist?.totalRates
          ? " N/A"
          : therapist.rateCount / therapist.totalRates}{" "}
        <span>({therapist?.totalRates})</span>
      </p>
    </>
  );
};

export default TherapistSatisfaction;
