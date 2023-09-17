import { useState } from "react";
import InfoCard from "@/components/patient/InfoCard";
import Card from "@/components/page/Card";
import Header from "@/components/page/Header";
import config from "@/src/config";

const FindPatient = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [searchMessage, setSearchMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(`email address: ${emailAddress}`)
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/patient?email=${emailAddress}`
      );
      const data = await response.json();
      //   console.log(`data: ${data.firstName}`)
      if (data.firstName) {
        setPatientData(data);
        setSearchMessage(null);
      } else {
        setPatientData(null);
        setSearchMessage("No patient found with this email address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Header
        headline={`Search Patient`}
        subtext={"Please enter your patient email address to connect."}
      />

      <div className=" text-center ">
        <form className=" space-x-5" onSubmit={handleSubmit}>
          <input
            className=" mb-5 space w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
            placeholder="Email"
            type="text"
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
          />
          <button
            type="submit"
            className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
          >
            Search
          </button>
        </form>
        {searchMessage && <p>{searchMessage}</p>}
        {patientData && <InfoCard patientData={patientData} />}
      </div>
    </Card>
  );
};

export default FindPatient;
