import { useRouter } from 'next/router';
import { useAtom, useSetAtom } from 'jotai';
import { userTokenAtom } from './Layout';
// const jwt = require('jsonwebtoken');

const Logout = (props) => {
  const router = useRouter();
  const setUserToken = useSetAtom(userTokenAtom)
  const [userToken] = useAtom(userTokenAtom)
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log( `Before logging out token:}`)
    // console.log( `Before logging out token: ${userToken}`)
    setUserToken('')
    // console.log( `After logging out token: ${userToken}`)
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
