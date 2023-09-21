import Link from "next/link";
import Rating from "../Rating";

const TreatmentCard = ({ treatment }) => {
  return (
    <div
      className=" lg:w-2/5 md:w-2/3 text-sm md:text-base shadow-lg shadow-blue-300/20 mx-auto rounded-lg "
      style={{ backgroundColor: "rgba(255, 255, 255, 0.11)" }}
    >
      <li key={treatment._id}>
        <Link href={"/treatment/" + treatment._id}>
          <p>
            <span className=" font-bold"> Title:</span> {treatment.title}
          </p>
          {/* <p>
            <span className=" font-bold">Description:</span>{" "}
            {treatment.description}
          </p> */}
          <p>
            <span className=" font-bold">Used for diseases:</span>{" "}
            {treatment?.diseaseTreatment != ""
              ? treatment?.diseaseTreatment
              : "N/A"}
          </p>
          <>
            <p className="">
              {/* Rate from patients:{" "}
        {treatment?.patientVoteCount
          ? treatment?.patientVoteCount / treatment?.patientTotalVotes
          : "0"}{" "} */}
              Rate from{" "}
              <span className=" font-bold">
                ({treatment?.patientTotalVotes}){" "}
              </span>
              patients:{" "}
              <span className=" flex">
                <span className=" mx-auto my-2">
                  {treatment?.patientTotalVotes ? (
                    <Rating
                      rating={
                        treatment?.patientVoteCount /
                        treatment?.patientTotalVotes
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
              <span className=" font-bold">
                ({treatment?.therapistTotalVotes})
              </span>{" "}
              therapists:{" "}
              {/* {treatment?.therapistVoteCount / treatment?.therapistTotalVotes} */}
              <span className=" flex">
                <span className=" mx-auto my-2">
                  {treatment?.therapistTotalVotes ? (
                    <Rating
                      rating={
                        treatment?.therapistVoteCount /
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
          <p>
            <span className=" font-bold">Created by:</span>{" "}
            {treatment.creator
              ? `${treatment?.creator?.firstName} ${treatment?.creator?.lastName}`
              : "N/A"}
          </p>
        </Link>
      </li>
    </div>
  );
};

export default TreatmentCard;
