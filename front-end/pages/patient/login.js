import { useState } from 'react';
// import useSWR from 'swr';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //useSWR is more useful when we want to continuously fetch data from an API 
  //endpoint and update our UI with the latest data. It provides an easy way to 
  //handle caching, stale-while-revalidate, and other data-fetching-related features.
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    if (response.ok) {
      console.log('Logged in successfully');
    } else if (response.status === 401) {
      console.log('Incorrect password');
    } else {
      console.log('Error logging in');
    }
  };
  
  

  return (
    <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
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
    </div>
  );
};

export default Login;
