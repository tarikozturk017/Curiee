import { useAtom } from "jotai";
import { userTypeAtom } from "./Layout";
import PatientSideBar from "./patient/SideBar";
import TherapistSideBar from "./therapist/SideBar";

const SideBar = () => {
  const [userType] = useAtom(userTypeAtom);
  return (
    <>{userType === "patient" ? <PatientSideBar /> : <TherapistSideBar />}</>
  );
};

export default SideBar;
