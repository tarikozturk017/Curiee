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
            <nav className="bg-slate-900 text-white p-3">
                <ul className="container flex flex-wrap items-center justify-evenly mx-auto">
                    <li><Link href="/treatments">Explore Treatments</Link></li>
                    <li><Link href="/therapists">Explore Therapists</Link></li>
                    {token ? <li><Logout /></li>  
                    :<li><Link href="/login">Login</Link></li>}
                    {token ? <li>Profile</li> 
                    :<li><Link href="/register">Register</Link></li>}
                </ul>
            </nav>
        </>    
    );
};

export default Navbar;
