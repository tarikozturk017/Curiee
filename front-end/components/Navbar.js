import Link from "next/link";
import Logout from "./Logout";
import { atom, useAtom } from "jotai";
import { userTokenAtom, userTypeAtom } from "./Layout";

const Navbar = () => {
    const [token] = useAtom(userTokenAtom)
    const [type] = useAtom(userTypeAtom)
    // console.log(`TOKEN :::: ${token}`)
    return ( 
        <>
            <nav className="bg-slate-900 text-white p-3">
                <ul className="container flex flex-wrap items-center justify-evenly mx-auto">
                    <li><Link href="/treatments">Explore Treatments</Link></li>
                    <li><Link href="/therapists">Explore Therapists</Link></li>
                    {token ? <li><Logout /></li>  
                    :<li><Link href="/login">Login</Link></li>}
                    {/* {token ? <li><Link href="/therapist/dashboard">Profile</Link></li> 
                    :<li><Link href="/register">Register</Link></li>} */}
                    {token ? (
                        <li><Link href={type === 'therapist' ? '/therapist/dashboard' : '/patient/dashboard'}>Profile</Link></li>
                    ) : (
                        <li><Link href="/register">Register</Link></li>
                    )}
                </ul>
            </nav>
        </>    
    );
};

export default Navbar;
