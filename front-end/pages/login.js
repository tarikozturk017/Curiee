import Link from "next/link";

const Login = () => {
    return (
        <div className=" text-center">
            <Link href="/patient/login">Patient Login</Link>
            <Link href="/therapist/login">Therapist Login</Link>
        </div>
    )
} 
export default Login;