import { useEffect, useState } from "react";

const TherapistSatisfaction = ({therapistId, key}) => {
    const [therapist, setTherapist] = useState()


    useEffect(() => {
        if (therapistId) {
            const fetchTreatment = async () => {
            const res = await fetch(`http://localhost:3001/therapist/${therapistId}`);
            const data = await res.json();
            setTherapist(data);
          };
    
          fetchTreatment();
        }
      }, [therapistId, key]);    

    return ( 
        <>
            <p>Therapist Satisfaction Rate: {therapist?.rateCount / therapist?.totalRates} <span>({therapist?.totalRates})</span></p>
        </>
    )
}

export default TherapistSatisfaction;