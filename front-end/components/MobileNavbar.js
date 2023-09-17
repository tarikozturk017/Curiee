// MobileMenu.js
import Link from "next/link";
import Logout from "./Logout";

const MobileNavbar = ({ isOpen, onClose, token, type }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed top-0 right-0 h-full w-screen from-gray-800 via-gray-600 to-gray-800 bg-gradient-to-r p-4 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700"
        >
          <span className="text-3xl md:text-4xl text-white">&times;</span>
        </button>
        <ul className="text-center mt-12">
          <li onClick={onClose} className="mb-4">
            <Link href="/">Home</Link>
          </li>
          <li onClick={onClose} className="mb-4">
            <Link href="/about">About</Link>
          </li>
          <li onClick={onClose} className="mb-4">
            <Link href="/treatments">Explore Treatments</Link>
          </li>
          <li onClick={onClose} className="mb-4">
            <Link href="/therapists">Explore Therapists</Link>
          </li>
          {token ? (
            <li
              onClick={onClose}
              className=" mb-4 hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer"
            >
              <Logout />
            </li>
          ) : (
            <li
              onClick={onClose}
              className=" mb-4 hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer "
            >
              <Link href="/login">Login</Link>
            </li>
          )}
          {/* {token ? <li><Link href="/therapist/dashboard">Profile</Link></li> 
                    :<li><Link href="/register">Register</Link></li>} */}
          {token ? (
            <li
              onClick={onClose}
              className=" mb-4 hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer "
            >
              <Link
                href={
                  type === "therapist"
                    ? "/therapist/dashboard"
                    : "/patient/dashboard"
                }
              >
                Profile
              </Link>
            </li>
          ) : (
            <li
              onClick={onClose}
              className=" mb-4 hover:text-orange-400 transition-colors hover:text-sky-200/80  duration-300 hover:cursor-pointer "
            >
              <Link href="/register">Register</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
