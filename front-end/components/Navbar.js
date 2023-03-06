import Link from "next/link";
import Logout from "./logout";
import { atom, useAtom } from "jotai";
import { userTokenAtom } from "./Layout";

const Navbar = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token] = useAtom(userTokenAtom)
    // console.log(`Token in Navbar: ${token}`)
    
    return ( 
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <ul className="container flex flex-wrap items-center justify-evenly mx-auto">
                    <li><Link href="/treatments">Explore Treatments</Link></li>
                    <li><Link href="/treatments">Explore Therapists (TODO)</Link></li>
                    {token !== '' ? <li><Logout /></li>  
                    :<li><Link href="/login">Login</Link></li>}
                    {token !== '' ? <li>Profile</li> 
                    :<li>Register</li>}
                </ul>
            </nav>
        </>    
    );
};

export default Navbar;
