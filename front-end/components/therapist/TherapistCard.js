import Link from "next/link";
import Rating from "../Rating";

const TherapistCard = ({ therapist }) => {
  return (
    <div
      className="shadow-lg shadow-blue-300/20 mx-auto rounded-lg py-0 max-w-[40%] mb-5"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.11)" }}
    >
      <li key={therapist._id}>
        <Link href={"/therapist/" + therapist._id}>
          <div className="flex">
            <div className="my-4 text-center  flex items-center ml-4">
              <img
                // src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                src={
                  therapist?.profilePictureLink
                    ? therapist?.profilePictureLink
                    : `https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg`
                }
                className="w-16 rounded-full shadow-xl shadow-blue-400/40"
                alt="Avatar"
              />
              <div className="text-left ml-3">
                <h5 className="mt-5 text-xl font-medium leading-tight">
                  {therapist.firstName} {therapist.lastName}
                </h5>
                <p className="text-neutral-500 ">
                  {therapist?.occupation} occupation
                </p>
              </div>
            </div>
            <div className="flex items-center ml-auto mr-4">
              <p className="">
                {/* <span className="font-bold">Satisfaction rate: </span>
                {!therapist?.totalRates
                  ? " N/A"
                  : therapist.rateCount / therapist.totalRates}{" "}
                <span>({therapist?.totalRates})</span> */}
                <span className=" flex">
                  <span className=" mx-auto my-2">
                    {therapist?.totalRates ? (
                      <Rating
                        rating={therapist.rateCount / therapist.totalRates}
                      />
                    ) : (
                      <></>
                    )}
                    {!therapist?.totalRates && <Rating rating={0} />}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </Link>
      </li>
    </div>
  );
};

export default TherapistCard;
