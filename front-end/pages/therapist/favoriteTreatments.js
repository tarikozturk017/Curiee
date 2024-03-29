import { userAtom } from "@/components/therapist/SideBar";
import { useAtom } from "jotai";
import Link from "next/link";
import useSWR from "swr";
import Card from "@/components/page/Card";
import Header from "@/components/page/Header";
import TreatmentCard from "@/components/treatment/TreatmentCard";
import config from "@/src/config";

const FavoriteTreatments = () => {
  const [therapist] = useAtom(userAtom);

  const { data: favTreatments, error } = useSWR(
    `${config.apiBaseUrl}/therapist/${therapist._id}/retrieveFavTreatments`,
    async (url) => {
      // const res = await fetch(url)
      const res = await fetch(url);
      return res.json();
    }
  );

  if (error)
    return (
      <div className=" mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center">
        Failed to load favorite treatments
      </div>
    );
  if (!favTreatments)
    return (
      <div className=" mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center">
        Loading...
      </div>
    );

  console.log(favTreatments);
  return (
    <Card>
      <div className=" text-center">
        <Header
          headline={"Favorite Treatments"}
          subtext={"You can see your favorite treatment models."}
        />

        <div className=" text-center">
          {favTreatments ? (
            <>
              <ul className=" space-y-5">
                {favTreatments.map((treatment) => (
                  <TreatmentCard treatment={treatment} />
                ))}
              </ul>
            </>
          ) : (
            <>You do not have any favorite treatment</>
          )}
        </div>
      </div>
      <div className=" lg:hidden h-24"></div>
    </Card>
  );
};

export default FavoriteTreatments;
