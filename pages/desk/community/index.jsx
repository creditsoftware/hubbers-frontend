import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Home from './home';
const Community = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push('/desk/community/home');
  },[]);
  return (
    <Home/>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Community; 