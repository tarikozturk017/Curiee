import { useEffect, useState } from "react";
import config from "@/src/config";
import Rating from "../Rating";

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
      <p className="">
        {/* Rate from patients:{" "}
        {treatment?.patientVoteCount
          ? treatment?.patientVoteCount / treatment?.patientTotalVotes
          : "0"}{" "} */}
        Rate from{" "}
        <span className=" font-bold">({treatment?.patientTotalVotes}) </span>
        patients:{" "}
        <span className=" flex">
          <span className=" mx-auto my-2">
            {treatment?.patientTotalVotes ? (
              <Rating
                rating={
                  treatment?.patientVoteCount / treatment?.patientTotalVotes
                }
              />
            ) : (
              <></>
            )}
            {!treatment?.patientTotalVotes && <Rating rating={0} />}
          </span>
        </span>
        {/* <span>({treatment?.patientTotalVotes})</span> */}
      </p>
      <p>
        Rate from{" "}
        <span className=" font-bold">({treatment?.therapistTotalVotes})</span>{" "}
        therapists:{" "}
        {/* {treatment?.therapistVoteCount / treatment?.therapistTotalVotes} */}
        <span className=" flex">
          <span className=" mx-auto my-2">
            {treatment?.therapistTotalVotes ? (
              <Rating
                rating={
                  treatment?.therapistTotalVotes /
                  treatment?.therapistTotalVotes
                }
              />
            ) : (
              <></>
            )}
            {!treatment?.therapistTotalVotes && <Rating rating={0} />}
          </span>
        </span>
      </p>
    </>
  );
};

export default TreatmentSatisfaction;
