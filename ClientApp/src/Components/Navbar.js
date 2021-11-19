import React from 'react';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  return (
    <>
      <div>
        <nav className='h-16 bg-gray-800 flex items-center justify-around'>
          <h1 className='font-sans  text-2xl font-semibold tracking-widest text-white'>
            HairSalon<span className='font-sans tracking-normal'>.com</span>
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('Username');
              localStorage.removeItem('Useremail');
              history.push('/');
            }}
            className={`text-white bg-gray-700 px-4 py-2 rounded-md ${
              localStorage.getItem('Useremail') ? 'block' : 'hidden'
            }`}
          >
            Log out
          </button>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
