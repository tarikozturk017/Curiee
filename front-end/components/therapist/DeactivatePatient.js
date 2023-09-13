import { useAtom } from "jotai";
import { userAtom } from "./SideBar";
import { useRouter } from "next/router";
import config from "@/src/config";

const DeactivatePatient = ({ patientData }) => {
  const [therapistData, setTherapistData] = useAtom(userAtom);
  const router = useRouter();

  const handleClick = async () => {
    try {
      //sendTherapistRequest
      const response = await fetch(
        `${config.apiBaseUrl}/therapist/deactivatePatient`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: patientData._id,
            therapistId: therapistData._id,
          }),
        }
      );
      if (response) {
        console.log(response);
        router.push("/patients");
      }
    } catch (error) {
      console.error(error);
    }

    // console.log(`patient id: ${patientData._id}, therapist id: ${therapistData._id}`)
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="rounded-full bg-red-600 p-2 px-8 text-white hover:bg-red-900"
      >
        Deactivate Patient
      </button>
    </>
  );
};

export default DeactivatePatient;
