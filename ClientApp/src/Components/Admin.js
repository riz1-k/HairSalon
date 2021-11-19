import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';

function HomePage() {
  const [dia, setdia] = useState([]);
  const [salt, setsalt] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'appointments')
      .then(response => response.json())
      .then(data => {
        setdia(data);
      });
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setsalt(data);
      });
  }, []);

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'appointments/' + id, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(window.location.reload());
    }
  };

  return (
    <div>
      <div className={`w-11/12 flex justify-center mb-8 mt-10 `}>
        <table>
          <thead>
            <th className='text-md  font-semibold  tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
              <th className='px-4 py-3 '>Appointments</th>
            </th>
            <tr className='text-md  font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
              <th className='px-4 py-3 '>Id</th>
              <th className='px-4 py-3 '>Customer Name</th>
              <th className='px-4 py-3 '>Customer Email</th>
              <th className='px-4 py-3 '>Barber</th>
              <th className='px-4 py-3 '>Date</th>
              <th className='px-4 py-3 '>Time</th>
              <th className='px-4 py-3 '>Fee</th>
              <th className='px-4 py-3 '>Cancel</th>
            </tr>
          </thead>

          <tbody className='bg-white'>
            {dia.map(mov => (
              <tr
                className='text-gray-700 hover:bg-gray-100 text-center '
                key={mov.ApId}
              >
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.ApId}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Username}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Useremail}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Barbername}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.ApDate}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.ApTime}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Fee}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border flex justify-center'>
                  {
                    <AiFillDelete
                      onClick={() => deleteHandler(mov.ApId)}
                      className='text-red-500 text-2xl cursor-pointer '
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`w-11/12 flex  ml-64 mb-8 mt-10 `}>
        <table>
          <thead>
            <th className='text-md  font-semibold  tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
              <th className='px-4 py-3 '>Users</th>
            </th>
            <tr className='text-md  font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
              <th className='px-4 py-3 '>Id</th>
              <th className='px-4 py-3 '>Name</th>
              <th className='px-4 py-3 '>Email</th>
            </tr>
          </thead>

          <tbody className='bg-white'>
            {salt.map(mov => (
              <tr
                className='text-gray-700 hover:bg-gray-100 text-center '
                key={mov.UserId}
              >
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.UserId}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Username}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Useremail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
