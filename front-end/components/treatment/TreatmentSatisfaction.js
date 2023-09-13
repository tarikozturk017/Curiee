import { useEffect, useState } from "react";
import config from "@/src/config";

const TreatmentSatisfaction = ({ treatmentId, key }) => {
  const [treatment, setTreatment] = useState();

  useEffect(() => {
    if (treatmentId) {
      const fetchTreatment = async () => {
        const res = await fetch(`${config.apiBaseUrl}/exercise/${treatmentId}`);
        const data = await res.json();
        setTreatment(data);
      };

      fetchTreatment();
    }
  }, [treatmentId, key]);

  return (
    <>
      <p>
        Rate from patients:{" "}
        {treatment?.patientVoteCount
          ? treatment?.patientVoteCount / treatment?.patientTotalVotes
          : "0"}{" "}
        <span>({treatment?.patientTotalVotes})</span>
      </p>
      <p>
        Rate from therapists:{" "}
        {treatment?.therapistVoteCount / treatment?.therapistTotalVotes}
        <span>({treatment?.therapistTotalVotes})</span>
      </p>
    </>
  );
};

export default TreatmentSatisfaction;
