import Link from "next/link";

const Register = () => {
    return (
        <div className=" text-center">
            <Link href="/patient/register">Patient Register</Link>
            <Link href="/therapist/register">Therapist Register</Link>
        </div>
    )
} 
export default Register;