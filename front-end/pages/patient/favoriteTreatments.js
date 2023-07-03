
import { userAtom } from '@/components/therapist/SideBar';
import { useAtom } from 'jotai';
import Link from 'next/link';
import useSWR from 'swr'

const FavoriteTreatments = () => {
    const [therapist] = useAtom(userAtom);

    const { data: favTreatments, error } = useSWR(`http://localhost:3001/therapist/${therapist._id}/retrieveFavTreatments`, async (url) => {
        // const res = await fetch(url)
        const res = await fetch(url);
        return res.json();
    })

    if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load favorite treatments</div>
    if (!favTreatments) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>  

    
    return (
        <div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>
        <h2>My Favorite Treatments</h2>
        <div className=' mx-auto rounded-lg p-5 text-2xl bg-blue-100 max-w-max text-center'>
        {favTreatments ? <>
            <ul>
                {favTreatments.map((treatment) => (
                <li key={treatment._id}><Link href={"/treatment/" + treatment._id}>{treatment.title}</Link></li>
                ))}
            </ul>
        </>
        : <>You do not have any favorite treatment</>}
        </div>
        </div>
    );
};

export default FavoriteTreatments;
