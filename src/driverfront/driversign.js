import Cookies from "js-cookie";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com'
import {useState,useRef} from 'react';
import Nav from '../comnav';
import '../userfront/signin.css'
function Sign(){
    const navi=useNavigate();
    const val=useRef({});
    const newotp=useRef("");
    const [otp,setOtp]=useState("");
    const[email,setEmail]=useState("");
    const[phone,setPhone]=useState("");
    const [conf,setConf]=useState(false);
    const [con,setCon]=useState(false);
    const[big,setBig]=useState(false);
    const[conpass,setConpass]=useState("");
    const[conotp,setConotp]=useState("");
    const[checker,setChecker]=useState(false);
    let emailpart=/^[a-z0-9._%+-]+@gmail+\.com$/i;
    const setvalue=(e)=>{
        val.current[e.target.name]=e.target.value;
    }
        function sendotp(e){
            e.preventDefault();
            setConf(true);
            setCon(true);
         if(!emailpart.test(val.current.email))
        {
            setEmail("Invalid email format");
            setCon(false);
            setConf(false);
        }
        else if(!(/^[6-9][0-9]{9}$/).test(val.current.phone)){
            setPhone("Invalid Phone number");
            setCon(false);
            setConf(false);
        }
        else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val.current.pass))
        {
            setConpass("Password must have 8 digit and special charater");
            setCon(false);
            setConf(false);
        }
        else if(val.current.pass!=val.current.conf)
        {
            setConpass("Confirm as same as password");
            setCon(false);
            setConf(false);
        }
        else if(!val.current.name || !val.current.worklocation || !val.current.address || !val.current.vehicaltype || !val.current.numberplate)
        {
            setConpass("Please fill all details");
            setCon(false);
            setConf(false);
        }
        else{
            axios.post("https://uber-a8pv.onrender.com/drivercheck",val.current)
            .then(res=>{console.log(res);
        if(res.data=="ok"){
            setBig(true);
            const code=Math.floor(Math.random()*9000*1000);
            setOtp(code);
            const params={
                email:val.current.email,
                code:code
            };
            emailjs.send("Murugan@3800","template_xegfrfi",params,"zuRvOjZLYMi_CBmLs")
            .then(
        (response) => {
            setCon(false);
            setConf(false);
            setBig(false);
            setChecker(true);
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
    }
    else{
        setCon(false);
        setConf(false);
        setConpass(res.data);
    }
}
).catch(err=>{console.log("Error:",err); setCon(false);setConf(false);})
        }
        }
    function insert(e){
        setConf(true);
        e.preventDefault();
        console.log(val.current);
        if(newotp.current.value==otp)
        {
        axios.post("https://uber-a8pv.onrender.com/driversignin",val.current)
        .then(res=>{setBig(false);console.log(res.data)
            if(res.data.message=="Inserted")
            {
            Cookies.set("tokendriver", res.data.token, { expires: 7, secure: true, sameSite: "strict" });
            navi('/driverhome');
            }
        else
            setConpass(res.data.message);setConf(false);setBig(false);setChecker(false)}).catch(err=>{console.log(err);setConf(false)})
        }
        else{
            setBig(false);
            setConf(false);
            setConotp("Invalid OTP");
            console.log("Invalid otp");
        }
    }
    return(
        <>
        <Nav></Nav>
        {big?(<div className="d-flex justify-content-center align-item-center m">
                <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-info" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-light" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>):
        (<><div className="signup-page ma1">
            <div className="signup-container">
            <form method="POST">
                <input type="text" placeholder="Name" className="form-control mb-3 " name="name" onChange={(e)=>{setvalue(e);}} required></input>

                <input type="text" placeholder="Email ID" className="form-control " name="email" onChange={(e)=>{setvalue(e);setEmail("");setConpass("")}} required></input>
                <div style={{color:"red"}} className="mb-3">{email}</div>


                <input type="number" placeholder="Phone number" className="form-control" name="phone" onChange={(e)=>{setvalue(e);setPhone("");setConpass("")}} required></input>
                <div style={{color:"red"}} className="mb-3">{phone}</div>

                    <select name="vehicaltype" onChange={(e)=>{setvalue(e);setConpass("")}} className="form-select mb-3">
                        <option>Select the vehicals</option>
                        <option value="bike">bike</option>
                        <option value="auto">auto</option>
                        <option value="car">car</option>
                    </select>
                  <input type="text" placeholder="Number plate" className="form-control mb-3 " name="numberplate" onChange={(e)=>{setvalue(e);setConpass("")}} required></input>
                   <input type="text" placeholder="Prefer location" className="form-control mb-3 " name="worklocation" onChange={(e)=>{setvalue(e);setConpass("")}} required></input>
                   <textarea name="address" className="form-control mb-3" placeholder="Enter your address" style={{resize:"none"}} onChange={(e)=>{setvalue(e);setConpass("")}}></textarea>

                <input type="password" placeholder="Password" className="form-control mb-4" name="pass" onChange={(e)=>{setvalue(e);setConpass("")}} required></input>
                <input type="password" placeholder="Confirm password" className="form-control" name="conf" onChange={(e)=>{setvalue(e);setConpass("")}}></input>
                <div style={{color:"red"}} className="mt-3">{conpass}</div>

               
                <input type="button" value={`${conf ? "loading...":"Submit"}`} className="btn btn-submit me-3 mt-3" onClick={(e)=>sendotp(e)}></input>
                <input type="reset" className="btn btn-reset mt-3" onClick={(e)=>{setConpass("");setPhone("");setEmail("")}}></input>
            </form>
             <p className="mt-4">Already have an account <a href="/userlog">Login</a></p>
            </div>
        </div>
        <div className={`modal fade ${checker ? "show d-block" : ""}`}  tabIndex="-1" role="dialog" aria-hidden="true"style={{ backgroundColor: checker ? "rgba(0,0,0,0.5)" : "" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Enter the OTP Sent to {val.current.email}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e)=>setChecker(false)}></button>
                </div>
                <form method="POST" onSubmit={(e)=>insert(e)}>
                    <div class="modal-body">
                        <input type="number" ref={newotp} className="form-control" onChange={(e)=>{newotp.current.value=e.target.value;setConotp("")}}></input>
                         <div style={{color:"red"}} className="mt-3">{conotp}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal" onClick={(e)=>sendotp()}>{con?"sending...":"Resend"}</button>
                        <button type="submit" class="btn btn-sm btn-outline-primary">{conf?"Submiting...":"Submit"}</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
</>)}
        </>
    )
}
export default Sign;