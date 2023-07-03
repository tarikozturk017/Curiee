const TreatmentSatisfaction = ({treatment}) => {
    return ( 
        <>
            <p>Rate from patients: {treatment.patientVoteCount / treatment.patientTotalVotes}</p>
            <p>Rate from therapists: {treatment.therapistVoteCount / treatment.therapistTotalVotes}</p>
            {/* <p>patientVoteCount: {treatment.patientVoteCount}</p>
            <p>therapistVoteCount: {treatment.therapistVoteCount}</p> */}
        </>
    )
}

export default TreatmentSatisfaction;