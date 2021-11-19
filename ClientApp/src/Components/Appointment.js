import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Backdrop from './BackDrop';
import Payment from './Payment';

function HomePage() {
  const ref = useRef();
  const [userInfo, setuserInfo] = useState([]);
  const [doc, setdocs] = useState([]);
  const [drop, setDrop] = useState(false);
  const history = useHistory();

  function handleClick() {
    history.push('/');
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'barbers')
      .then(response => response.json())
      .then(data => {
        setdocs(data);
      });
  }, []);

  const changeHandler = e => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (localStorage.getItem('payed')) {
      fetch(process.env.REACT_APP_API + 'appointments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: event.target.PatientName.value,
          Useremail: event.target.PatientEmail.value,
          Barbername: event.target.DoctorName.value,
          ApDate: event.target.ApDate.value,
          ApTime: event.target.ApTime.value,
          Fee: event.target.Fee.value,
        }),
      })
        .then(res => res.json())
        .then(
          result => {
            console.log(result);
            alert('Your appointment has been scheduled!');
            localStorage.removeItem('Username');
            localStorage.removeItem('Useremail');
            localStorage.removeItem('payed');
            handleClick();
          },
          error => {
            alert('Failed');
          }
        );
    } else {
      alert('Payment is required for booking an appointment');
    }
  };

  return (
    <div>
      {drop && (
        <Backdrop loading={false}>
          <Payment setDrop={setDrop} />
        </Backdrop>
      )}
      <h1 className='text-4xl font-medium mt-3 flex justify-center text-black '>
        Make an Appointment
      </h1>
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster w-3/6 mx-auto '>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Name'
              name='PatientName'
              onChange={changeHandler}
              value={localStorage.getItem('Username')}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='email'
              placeholder='Email'
              name='PatientEmail'
              onChange={changeHandler}
              value={localStorage.getItem('Useremail')}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <div class='relative inline-flex'>
              <svg
                class='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 412 232'
              >
                <path
                  d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
                  fill='#648299'
                  fillRule='nonzero'
                />
              </svg>
              <p className='mt-1 mr-3'>Barber :</p>
              <select
                name='DoctorName'
                class='border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
              >
                {doc.map(d => (
                  <option value={d.Barbername}>{d.Barbername}</option>
                ))}
              </select>
            </div>
            <br />
            <input
              type='date'
              name='ApDate'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='time'
              name='ApTime'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='text'
              name='Fee'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none cursor-not-allowed  '
              value='120'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='button'
              onClick={() => setDrop(true)}
              className='block transition-all duration-300 ease-linear  shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-2 px-8 rounded-md'
            >
              {localStorage.getItem('payed') ? 'Payed' : 'Pay'}
            </button>
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-full'
            >
              Create an Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
