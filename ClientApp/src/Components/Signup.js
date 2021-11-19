import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const [userInfo, setuserInfo] = useState([]);
  const [Users, setUsers] = useState([]);
  const history = useHistory();

  function handleClick() {
    history.push('/appointment');
  }

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        console.log(data);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    refreshList();
    const accExists = Users.filter(user => user.Useremail === userInfo.Email);
    console.log(accExists);
    if (accExists.length <= 0) {
      fetch(process.env.REACT_APP_API + 'users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: userInfo.UserName,
          Useremail: userInfo.Email,
          Userpassword: userInfo.Password,
        }),
      })
        .then(res => res.json())
        .then(
          result => {
            alert(result);
            localStorage.setItem('Username', userInfo.UserName);
            localStorage.setItem('Useremail', userInfo.Email);
            handleClick();
          },
          error => {
            alert('Failed while tring  to create an account');
          }
        );
    } else {
      alert('Email has already been registered!');
    }
  };

  const ref = useRef(null);

  const changeHandler = e => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
    console.log(userInfo);
  };

  return (
    <>
      <div className=' h-reg w-2/5  py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster'>
        <div>
          <h1 className='text-2xl font-bold text-center mb-4 cursor-pointer'>
            Registeration
          </h1>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full name'
              required
              aria-required='true'
              name='UserName'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              onChange={changeHandler}
            />
            <input
              type='email'
              placeholder='Email'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              aria-required='true'
              name='Email'
              onChange={changeHandler}
            />
            <input
              type='password'
              placeholder='Password'
              name='Password'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              onChange={changeHandler}
              aria-required='true'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-lg'
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
