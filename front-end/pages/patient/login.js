import LoginForm from "@/components/LoginForm";


const Login = () => {
    // localStorage.removeItem('token');
    return (
        <>
            <LoginForm modelType={'patient'}/>
        </>
    )
}

export default Login;