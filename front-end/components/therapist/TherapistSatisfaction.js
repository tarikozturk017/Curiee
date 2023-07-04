import { useEffect, useState } from "react";

const TreatmentSatisfaction = ({treatmentId}) => {
    const [treatment, setTreatment] = useState()


    useEffect(() => {
        if (treatmentId) {
            const fetchTreatment = async () => {
            const res = await fetch(`http://localhost:3001/exercise/${treatmentId}`);
            const data = await res.json();
            setTreatment(data);
          };
    
          fetchTreatment();
        }
      }, [treatmentId]);    

    return ( 
        <>
            <p>Rate from patients: {treatment?.patientVoteCount / treatment?.patientTotalVotes} <span>({treatment?.patientTotalVotes})</span></p>
            <p>Rate from therapists: {treatment?.therapistVoteCount / treatment?.therapistTotalVotes}<span>({treatment?.therapistTotalVotes})</span></p>
        </>
    )
}

export default TreatmentSatisfaction;