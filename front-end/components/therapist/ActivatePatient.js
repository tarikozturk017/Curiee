import { useAtom } from "jotai";
import { userAtom } from "./SideBar";
import { useRouter } from "next/router";
import config from "@/src/config";

const ActivatePatient = ({ patientData }) => {
  const [therapistData, setTherapistData] = useAtom(userAtom);
  const router = useRouter();

  const handleClick = async () => {
    try {
      //sendTherapistRequest
      const response = await fetch(
        `${config.apiBaseUrl}/therapist/activatePatient`,
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
        className=" bg-green-800 rounded-xl text-white"
      >
        Activate Patient
      </button>
    </>
  );
};

export default ActivatePatient;
