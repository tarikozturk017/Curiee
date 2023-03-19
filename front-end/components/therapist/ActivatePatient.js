const ActivatePatient = ({ patientData }) => {
    const handleClick = () => {

        console.log(`clicked: ${patientData.firstName}`)
    }
        
    return (
        <>
            <button onClick={handleClick} className=" bg-green-800 rounded-xl text-white" >
                Activate Patient
            </button>
        </>
    )
}

export default ActivatePatient;