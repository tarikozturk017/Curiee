import Logout from "./logout";

const Navbar = () => {
    return ( 
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <ul className="container flex flex-wrap items-center justify-evenly mx-auto">
                    <li>Explore Therapists</li>
                    <li>Explore Treatments</li>
                    {localStorage.getItem('token') ? <li><Logout /></li> : <li>Login</li>}
                    {localStorage.getItem('token') ? <li>Profile</li> : <li>Register</li>}
                </ul>
            </nav>
        </>    
    );
};

export default Navbar;
