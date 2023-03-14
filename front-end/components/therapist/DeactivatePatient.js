const DeactivatePatient = ({ patientData }) => {
    const handleClick = () => {

        console.log(`clicked: ${patientData.firstName}`)
    }
        
    return (
        <>
            <button onClick={handleClick} className=" bg-red-800 rounded-xl text-white" >Deactivate Patient</button>
        </>
    )
}

export default DeactivatePatient;