import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com'
import {useState,useRef} from 'react'
import axios from 'axios';
import '../userfront/forget.css'
function Forget(){
    const navi=useNavigate();
     const emailput=useRef({});
     const pass=useRef({});
      const[checker,setChecker]=useState(false);
       const[forget,setFor]=useState(true);
       const [conf,setConf]=useState(false);
       const [con,setCon]=useState(false);
       const [otp,setOtp]=useState("");
       const[a,setA]=useState("");
        const[conpass,setConpass]=useState("");
        const newotp=useRef("");
        const[t,setT]=useState(false);
    function forgetpass(e){
  e.preventDefault();
  setCon(true);
  if(!/^[a-z0-9._%+-]+@gmail+\.com$/i.test(emailput.current.email)){
    setA("Invalid Email format");
  }
  else{
    setT(true);
    axios.post("https://uber-a8pv.onrender.com/drivercheck",emailput.current)
    .then(res=>{console.log(res);if(res.data.toLowerCase().includes("already")){
      const code=Math.floor(Math.random()*9000*1000);
            setOtp(code);
            const params={
                email:emailput.current.email,
                code:code
            };
            emailjs.send("Murugan@3800","template_xegfrfi",params,"zuRvOjZLYMi_CBmLs")
            .then(
        (response) => {
            setT(false);
            setChecker(true);
            setCon(false);
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
            setT(false);
            setCon(false);
          console.log("FAILED...", error);
        }
      );
    }
    else{
        setT(false);
        setA("Invalid user");
    }
}).catch(err=>{console.log(err);setT(false)})
  }
}
function otpcheck(){
    setConf(true);
    if(newotp.current.value!=otp){
        setConf(false)
        setConpass("Invalid OTP")
    }
    else{
        setFor(false);
    }
}
function update(){  
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(emailput.current.pass)){
        setConpass("Password must have 8 characters")
    }
    else if(emailput.current.pass!=emailput.current.confpass)
    {
        setConpass("Confirm as same as Password")
    }
    else{
        setConf(false);
    axios.post("https://uber-a8pv.onrender.com/driverpassupdate",emailput.current)
    .then(res=>{console.log(res.data.message);setConf(true);if(res.data.message=="success"){navi('/driverlog')}else{
        setA(res.data.message);
    }})
    .catch(err=>{console.log(err)})
    }
}
    return(
        <>
          <div className="forget-page">
        {forget?(<>
       <div className="container mt-5">
            <input type="email"  name="email" onChange={(e)=>{emailput.current[e.target.name]=e.target.value;setA("")}} placeholder="Enter the Email"></input>
            <div style={{color:"red"}}>{a}</div>
            <button className="btn btn-sm btn-outline-dark" onClick={forgetpass}>{t?"Sending...":"Send OTP"}</button>
      </div>


      <div className={`modal fade ${checker ? "show d-block" : ""}`}  tabIndex="-1" role="dialog" aria-hidden="true"style={{ backgroundColor: checker ? "rgba(0,0,0,0.5)" : "" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e)=>setChecker(false)}></button>
                </div>
                <form>
                    <div class="modal-body">
                        <input type="number" ref={newotp} className="form-control" onChange={(e)=>{newotp.current.value=e.target.value;setConpass("")}} placeholder="Enter the OTP"></input>
                         <div style={{color:"red"}} className="mt-3">{conpass}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal" onClick={(e)=>forgetpass(e)}>{con?"sending...":"Resend"}</button>
                        <button type="button" onClick={(e)=>otpcheck()} class="btn btn-sm btn-outline-primary">{conf?"Submiting...":"Submit"}</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>):
        (
            <>
            <div className="container-fluid mt-5">
            <input type="password" className="form-control" name="pass" onChange={(e)=>{emailput.current[e.target.name]=e.target.value;setConpass("")}} placeholder="Password"></input>
            <input type="password" className="form-control" name="confpass" onChange={(e)=>{emailput.current[e.target.name]=e.target.value;setConpass("")}} placeholder="Confirm Password"></input>
            <div style={{color:"red"}} className="mt-3">{conpass}</div>
            <button className="btn btn-outline-dark" onClick={(e)=>update()}>{conf?"Update":"Updating..."}</button>
            </div>
            </>
        )
        }
        </div>
        </>
    )
}
export default Forget;