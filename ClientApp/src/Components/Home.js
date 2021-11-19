import React from 'react';
import Login from './Login';
import SignUp from './Signup';
function Home() {
  return (
    <div className='flex justify-evenly bg-gray-800 h-screen '>
      <Login className='mt-16' />
      <SignUp className='mt-16' />
    </div>
  );
}

export default Home;
