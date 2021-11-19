import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Appointment from './Components/Appointment';
import Navbar from './Components/Navbar';
// import Navigation from './Components/Admin/AdminNavigation';
// import AdminCategory from './Components/Admin/AdminCategory';
// import AdminMovie from './Components/Admin/AdminMovie';
// import AdminUsers from './Components/Admin/AdminUsers';
// import UserNavigation from './Components/User/UserNavigation';
// import AboutMovie from './Components/User/AboutMovie';
// import AdminCinema from './Components/Admin/AdminCinema';
// import AdminBooked from './Components/Admin/AdminBooked';
// import Login from './Components/User/Login';
// import SignUp from './Components/User/SignUp';

const MainRouter = () => {
  const history = useHistory();
  const [nav, setNav] = useState(
    history.location.pathname.substr(0, 6) === '/admin'
  );

  history.listen(location => {
    if (location.pathname.substr(0, 6) === '/admin') {
      setNav(true);
    } else {
      setNav(false);
    }
  });
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/appointments' exact component={Appointment} />
        <Route path='/admin' exact component={Admin} />
      </Switch>
    </div>
  );
};

export default MainRouter;
