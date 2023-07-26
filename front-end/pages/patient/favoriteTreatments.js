
import { userAtom } from '@/components/patient/SideBar';
import { useAtom } from 'jotai';
import Link from 'next/link';
import useSWR from 'swr'
import Card from '@/components/page/Card';
import Header from '@/components/page/Header';

const FavoriteTreatments = () => {
    const [patient] = useAtom(userAtom);

    const { data: favTreatments, error } = useSWR(`http://localhost:3001/patient/${patient._id}/retrieveFavTreatments`, async (url) => {
        // const res = await fetch(url)
        const res = await fetch(url);
        return res.json();
    })

    if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load favorite treatments</div>
    if (!favTreatments) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>  

    console.log(favTreatments)
    return (
        <>
        <Card>
        <Header headline={`My Favorite Treatments`} subtext={'Find your favorite treatments below.'} />
            <div className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg p-1 w-full m-0 pt-5 max-w-[50%] mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}>
                <table className='w-full'>
                <thead className="" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
                <tr>
                    <th  className="px-6 py-3 " >
                        Treatment
                    </th>
                    <th  className="px-6 py-3" >
                        Rate
                    </th>
                </tr>
            </thead>
            <tbody>
                {favTreatments.map((treatment) => (

                    <tr key={treatment._id} className="">
                        <th scope="row" className="">
                        <Link href={"/treatment/" + treatment._id}>{treatment.title}</Link>        </th>
                    
                    <td className="px-6 py-1">
                        {treatment.patientVoteCount / treatment.patientTotalVotes} ({treatment.patientTotalVotes})
                    </td>
                    
                    
                    </tr>
                ))}
            </tbody>
            {favTreatments ? <>
                <ul>
                </ul>
            </>
            : <>You do not have any favorite treatment</>}
            </table>
            </div>
        </Card>
        </>
    );
};

export default FavoriteTreatments;
