import { useState } from 'react';
import { useRouter } from 'next/router'
import { useAtom, useSetAtom } from 'jotai';
import { userTokenAtom } from './Layout';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const setUserToken = useSetAtom(userTokenAtom)

  //useSWR is more useful when we want to continuously fetch data from an API 
  //endpoint and update our UI with the latest data. It provides an easy way to 
  //handle caching, stale-while-revalidate, and other data-fetching-related features.
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`http://localhost:3001/${props.modelType}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    if (response.ok) {
      const data = await response.json();
      // Store the token securely on the client side (e.g., in local storage)
      console.log(`login data: ${data.token}`)
      setUserToken(data.token)
      localStorage.setItem('token', data.token);
      router.push('/');
      // router.push('/dashboard');
      console.log('Logged in successfully');
    } else if (response.status === 401) {
      console.log('Incorrect password');
    } else {
      console.log('Error logging in');
    }
  };
  
  

  return (
    <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
         <h1>Welcome to {props.modelType} login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* // Render the PatientInfo component if the token exists */}
      {/* {token && <PatientInfo token={token} />}  */}
      {/* {token && <p>{token}</p>}  */}
    </div>
  );
};

export default LoginForm;
