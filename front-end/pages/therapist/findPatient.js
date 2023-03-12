import { useState } from 'react';
import InfoCard from '@/components/patient/InfoCard';

const FindPatient = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [searchMessage, setSearchMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(`email address: ${emailAddress}`)
    try {
      const response = await fetch(`http://localhost:3001/patient?email=${emailAddress}`);
      const data = await response.json();
    //   console.log(`data: ${data.firstName}`)
      if (data.firstName) {
        setPatientData(data);
        setSearchMessage(null);
      } else {
        setPatientData(null);
        setSearchMessage('No patient found with this email address');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>
      <h1>Patient Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email address:
          <input
            type="text"
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {searchMessage && <p>{searchMessage}</p>}
      {patientData && (
        <InfoCard patientData={patientData}/>
      )}
    </div>
  );
};

export default FindPatient;
