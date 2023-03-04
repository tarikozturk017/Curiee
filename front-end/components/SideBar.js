import Link from "next/link"
import { useRouter } from "next/router"

const SideBar = ({ setMainContent }) => {

   
    return (
        <div className="  p-10 text-white bg-slate-900 h-screen absolute min-w-min w-1/6 pt-5" >
            <p className=" m-5 text-center text-xl">FirstName LastName</p>
            <hr />
            <ul className=" mt-10 flex flex-col gap-5">
                {/* {listItems} */}
                <li><Link href="/">Home</Link></li>
                <li><Link href="/patients">My Patients</Link></li>
                <li><Link href="/patient/register">Create New Patient</Link></li>
                <li><Link href="/therapist/register">Create New Therapist</Link></li>
                <li><Link href="/treatments">Explore Treatments</Link></li>
                <li><Link href="/treatment/new">Create New Treatment</Link></li>
                <li><Link href="/patient/login">patient-login</Link></li>
                <li><Link href="/therapist/login">therapist-login</Link></li>
                <li><Link href="/logout">logout patient</Link></li>
                {/* <li><Link href="/appointments">My Appointments</Link></li> */}
            </ul>
        </div>
    )
}

export default SideBar