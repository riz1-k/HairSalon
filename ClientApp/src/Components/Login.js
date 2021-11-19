import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [userInfo, setuserInfo] = useState([]);
  const [Users, setUsers] = useState([]);
  const ref = useRef(null);
  const history = useHistory();

  const changeHandler = e => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const findUser = Users.filter(
      user =>
        user.Useremail === userInfo.PatientEmail &&
        user.Userpassword === userInfo.password
    );

    var Username = '';
    findUser.forEach(e => {
      Username = e.Username;
    });

    if (findUser.length > 0) {
      alert('Successfully logged in!');
      userInfo.PatientEmail === 'admin@gmail.com'
        ? history.push('/admin')
        : history.push('/appointments');

      localStorage.setItem('Username', Username);
      localStorage.setItem('Useremail', userInfo.PatientEmail);
    } else {
      alert('Invalid credentials');
      console.log('login failed');
    }
  };

  useEffect(() => {
    refreshList();
  }, []);
  return (
    <>
      <div className=' h-96 w-2/5 py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster  '>
        <div>
          <h1 className='text-2xl font-bold mt-2 text-center mb-4 cursor-pointer'>
            Login
          </h1>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='email'
              placeholder='Email'
              name='PatientEmail'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-full'
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
