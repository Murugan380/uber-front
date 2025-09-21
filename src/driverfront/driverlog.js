import '../App.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {useState,useRef} from 'react'
import axios from 'axios';
import Nav from '../comnav'
import '../userfront/login.css'
function Driverlog() {
  const navi=useNavigate();
  const input=useRef({});
   const[a,setA]=useState("");
   const[b,setB]=useState("");
   const[la,setLa]=useState(false);
   const strongpass= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   const chinput=(e)=>{
    input.current[e.target.name]=e.target.value;
  }
  function signin(e){
    e.preventDefault();
    if(!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(input.current.email))
    {
      setB("Invalid email");
    }
    else if(!strongpass.test(input.current.pass))
    {
      setA("Invalid Password")
    }
    else
    {
      setLa(true);
    axios.post("https://uber-a8pv.onrender.com/driverlogin",input.current)
    .then(res=>{console.log("Insert Result",res.data.message);
      if(res.data.message.toLowerCase().includes("invalid"))
      {
         setLa(false);
      setA(res.data.message);
      }
    else
    {
      setLa(false);
      Cookies.set("tokendriver",res.data.token, { expires: 7, secure: true, sameSite: "strict" });
      navi('/driverhome');
    }
    })
    .catch(err=>{console.log(err);setLa(false);alert("Some times wents wrong")})
  }
}
  return (
    <>
    <Nav></Nav>
        <div className="login-page">
          <div className="login-container">
        <input type="text" name="email" placeholder="Enter your Email" class="form-control mb-3" onChange={(e)=>{chinput(e);setB("");setA("")}} required ></input>
        <div className="mb-2" style={{color:"red"}}>{b}</div>
        <input type="password" placeholder="Password" name="pass" class="form-control mb-3" onChange={(e)=>{chinput(e);setA("")}} required></input>
        <div className="my-2" style={{color:"red"}}>{a}</div>
        <a className="d-flex mb-2" href='/driverforget'>Forget Password?</a>
        <button class="btn btn-primary mb-2" onClick={(e)=>signin(e)}>{la?"Processing":"Login"}</button>
        <p>Don't have an account  <a href="/driversign">Sign in</a></p>
    </div>
    </div>
    </>
  );
}

export default Driverlog;
