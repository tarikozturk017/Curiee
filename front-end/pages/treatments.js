import Link from "next/link";
import useSWR from "swr";
import Card from "@/components/page/Card";
import Header from "@/components/page/Header";
import TreatmentCard from "@/components/treatment/TreatmentCard";
import config from "@/src/config";
import { useAtom } from "jotai";
import { userIdAtom } from "@/components/Layout";

const Treatments = () => {
  const [userId] = useAtom(userIdAtom);

  const { data: exercises, error } = useSWR(
    `${config.apiBaseUrl}/exercise/all`,
    async (url) => {
      const res = await fetch(url);
      return res.json();
    }
  );

  if (error)
    return (
      <div className=" mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center">
        Failed to load exercises
      </div>
    );
  if (!exercises)
    return (
      <div className=" mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center">
        Loading...
      </div>
    );

  return (
    <Card>
      <Header
        headline={"Treatments"}
        subtext={"You can explore the treatment models created by therapists."}
      />
      <div className="text-center ">
        <ul className=" space-y-5 ">
          {exercises.map((exercise) => (
            <TreatmentCard treatment={exercise} />
            // <li key={exercise._id}><Link href={"/treatment/" + exercise._id}>{exercise.title}</Link></li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default Treatments;
