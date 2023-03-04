import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { userIdAtom } from '../components/Layout';


// const protectedRoutes = ['/patients'];

const Auth = (Component) => {
  return () => {
    // console.log(userIdAtom)
    const [userId] = useAtom(userIdAtom);
    const router = useRouter();

    console.log(`USING AUTH.JS CHECKING USER ID: ${userId}`)

    // useEffect(() => {
    //   if (!userId && protectedRoutes.includes(router.pathname)) {
    //     router.push('/login');
    //   }
    // }, [router, userId]);

    // return <Component />;
  };
};

export default Auth;
