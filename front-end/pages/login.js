import { useState } from "react";

const Login = () => {
    return (
        <div className=" text-center">
            <button onClick={() => console.log('Patient Login')}>Patient Login</button>
            <button  onClick={() => console.log('Therapist Login')}>Therapist Login</button>
        </div>
    )
} 
export default Login;