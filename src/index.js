import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dhome from './driverfront/driverhome'
import Dride from './driverfront/driverride'
import Dlog from './driverfront/driverlog'
import Dsign from './driverfront/driversign'
import Dprofile from './driverfront/driverprofile'
import Dabout from './driverfront/dabout'
import Dlogout from './driverfront/logout'
import Dforget from './driverfront/driverforget'
import Forget from './userfront/forgetpass'
import Logout from './userfront/userlogout'
import Home from './userfront/home';
import About from './userfront/about';
import Book from './userfront/booking';
import Ride from './userfront/rides';
import Log from './userfront/userlog';
import Sign from './userfront/signin';
import Profile from './userfront/profile'
import { BrowserRouter as Router,Route,Routes} from "react-router-dom"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Router>
<Routes>
 <Route exact path='/' element={< App />}></Route>
 <Route exact path='/home' element={<Home/>}></Route>
<Route exact path='/userlog' element={<Log/>}></Route>
<Route exact path='/profile' element={<Profile/>}></Route>
<Route exact path='/sign' element={<Sign/>}></Route>
<Route exact path='/book' element={<Book/>}></Route>
<Route exact path='/rides' element={<Ride/>}></Route>
<Route exact path='/about' element={<About/>}></Route>
<Route exact path='/dabout' element={<Dabout/>}></Route>
<Route exact path='/userlogout' element={<Logout/>}></Route>
<Route exact path='/forget' element={<Forget/>}></Route>
<Route exact path='/driverforget' element={<Dforget/>}></Route>
<Route exact path='/driverhome' element={<Dhome/>}></Route>
<Route exact path='/drides' element={<Dride/>}></Route>
<Route exact path='/driverlog' element={<Dlog/>}></Route>
<Route exact path='/driversign' element={<Dsign/>}></Route>
<Route exact path='/dprofile' element={<Dprofile/>}></Route>
<Route exact path='/driverlogout' element={<Dlogout/>}></Route>
</Routes>
</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
