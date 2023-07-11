import Link from "next/link";

const TreatmentCard = ({treatment}) => {
    return (
        <div className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg py-2 max-w-[40%] mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}>
            <li key={treatment._id}><Link href={"/treatment/" + treatment._id}>
                <p>Title: {treatment.title}</p>
                <p>Description: {treatment.description}</p>
                <p>Used for diseases: {treatment?.diseaseTreatment !='' ? treatment?.diseaseTreatment : 'N/A'}</p>
                <>
                    <p>Rate from patients: {!treatment?.patientVoteCount }{ treatment?.patientVoteCount && treatment?.patientVoteCount / treatment?.patientTotalVotes} <span>({treatment?.patientTotalVotes})</span></p>
                    <p>Rate from therapists: {!treatment?.therapistVoteCount } { treatment?.therapistVoteCount && treatment?.therapistVoteCount / treatment?.therapistTotalVotes}<span>({treatment?.therapistTotalVotes})</span></p>
                </>
                <p>Created by: {treatment.creator ? `${treatment?.creator?.firstName} ${treatment?.creator?.lastName}` : 'N/A'}</p>
            </Link></li>
        </div>
    )
}

export default TreatmentCard;