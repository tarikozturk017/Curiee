import { useRouter } from 'next/router';
// const jwt = require('jsonwebtoken');

const Logout = (props) => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    // console.log(localStorage)
    console.log('successfully logged out')
    router.push('/login');
  };

  return (
    <div className=' '>
      <form onSubmit={handleSubmit}>
        
        <button type="submit">Log out</button>
      </form>

    </div>
  );
};

export default Logout;
