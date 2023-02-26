import { useState, useEffect } from 'react'

const API_BASE = "http://localhost:3001";

const MyPatients = (props) => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        GetPatients();

        // console.log(patients);
    }, [])
    
    const GetPatients = () => {
        fetch(API_BASE + "/patients")
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.error("Error: ", err));
    }

    const patientsList = patients.map((patient) => {
        return (
            <li className=' ' key={patient.id}>
                {patient.firstName} {patient.lastName} - {patient.diagnosis}
            </li>
        )
    })

    return (
        <>
            <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
                <h3 className=' text-lg underline'>Your Patients</h3>
                <ul className=' '>{patientsList}</ul>
            </div>
        </>
    )
}

export default MyPatients;