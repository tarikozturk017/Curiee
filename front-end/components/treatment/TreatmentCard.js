import Link from "next/link";

const TreatmentCard = ({treatment}) => {
    return (
        <div className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg py-2 max-w-[40%] mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}>
            <li key={treatment._id}><Link href={"/treatment/" + treatment._id}>
                <p><span className=" font-bold"> Title:</span> {treatment.title}</p>
                <p><span className=" font-bold">Description:</span> {treatment.description}</p>
                <p><span className=" font-bold">Used for diseases:</span> {treatment?.diseaseTreatment !='' ? treatment?.diseaseTreatment : 'N/A'}</p>
                <>
                    <p><span className=" font-bold">Rate from patients:</span> {!treatment?.patientVoteCount }{ treatment?.patientVoteCount && treatment?.patientVoteCount / treatment?.patientTotalVotes} <span>({treatment?.patientTotalVotes})</span></p>
                    <p><span className=" font-bold">Rate from therapists:</span> {!treatment?.therapistVoteCount } { treatment?.therapistVoteCount && treatment?.therapistVoteCount / treatment?.therapistTotalVotes} <span>({treatment?.therapistTotalVotes})</span></p>
                </>
                <p><span className=" font-bold">Created by:</span> {treatment.creator ? `${treatment?.creator?.firstName} ${treatment?.creator?.lastName}` : 'N/A'}</p>
            </Link></li>
        </div>
    )
}

export default TreatmentCard;