import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {useState,useEffect,useRef} from 'react';
import { io } from "socket.io-client";
import emailjs from 'emailjs-com'
import Navbar from './navbar'
import '../userfront/rides.css'
function Dride(){
    const navi=useNavigate();
    const socket=useRef();
    const token=Cookies.get("tokendriver");
    let decode;
    const [ride,setRide]=useState(null)
    const[otp,setOtp]=useState();
    const[newotp,setNew]=useState();
    const[conf,setConf]=useState(false);
    const[con,setCon]=useState(false);
    const[err,setErr]=useState("");
    const[c,setC]=useState(false)
    const[checker,setCheck]=useState(false);
    useEffect(()=>{

    },[])
    if (!token) {
            navi('/driverlog');
            } else {
            try {
                decode = jwtDecode(token);
            } catch (err) {
                console.error("Invalid token:", err.message);
                navi('/driverlog');
            }
            }
    const drivers=useRef({
        driver:decode?.id||"",
        userName:decode?.name||""
    });
    useEffect(()=>{
        if(!decode){
            alert("Token missing login again")
            navi('/driverlog');
        }
        else{
        socket.current=io("https://uber-a8pv.onrender.com",{
            auth:{
                token:token
            }
        });
        socket.current.on('connect',()=>{
            socket.current.emit("driver:register",{driverId:drivers.current.driver})
        });

        socket.current.on("connect_error", (err) => {
                    console.error(" Socket connection failed:", err.message);
                     if(err.message=="xhr poll error"){
                        alert("Connections error")
                    }else{
                   let a= window.confirm("Authentication failed: " + err.message);
                    if(a){
                        navi('/driverlog')
                    }
                }
                });


        socket.current.emit("getdriver:data",drivers.current.driver);
        socket.current.on("driver:vaa",(data)=>{
            if(data)
            {
            setRide(pre=>({...pre,...data}))
            }
        })
        socket.current.on("ride:completed",(data)=>{
            if(data.message=="completed"){
                alert("Ride completed");
                navi('/driverhome');
            }
        });

         return () => {
        socket.current.disconnect(); // disconnect when component unmounts
        console.log("Socket disconnected");
    };
}
    },[]);

    function confirm(){
        const code=Math.floor(Math.random()*9000*1000);
        setOtp(code);
        setCon(true);
        setC(true);
        const params={
            email:ride.rider.email,
            code:code
            };
        emailjs.send("Murugan@3800","template_xegfrfi",params,"zuRvOjZLYMi_CBmLs")
        .then(
        (response) => {
            setCheck(true);
            setCon(false);
            setC(false);
            console.log("SUCCESS!", response.status, response.text);
            },
            (error) => {
            console.log("FAILED...", error);
            });
    }
    function submit(){
        if(otp==newotp){
            setConf(false);
            socket.current.emit("driver:complete",{userId:ride.rider._id,driverId:drivers.current.driver});
        }
        else{
            setErr("Invalid OTP")
        }
    }
    if(!ride||!ride._id)
      {
        return(
        <>
        <Navbar name={decode?.name||""}></Navbar>
        <div className="no-ride d-flex flex-column justify-content-center align-items-center text-center">
          <h3 className="fw-bold mb-3">No rides yet!</h3>
          <p className="text-muted mb-4">
            You haven’t Accept any rides yet. Start earning your share with Uber today!
          </p>
          <button
            className="btn btn-dark px-4"
            onClick={() => navi("/driverhome")}
          >
            Wait
          </button>
        </div>
        </>
        );
      }
      else{
    return(
        <>
        {ride?(
        <>
        <Navbar name={decode?.name||""}></Navbar>
        <div className="container va">
            <div class="card  max-width">
                <div class="card-body">
                    <h5 class="card-title ms-3 mb-2 text-center">Ride Details</h5>
                    <hr></hr>
                    <div className="d-flex align-items-center mb-2 ms-3">
                        <div className="fw-bold">Name  </div > <div> : {ride.friendname?ride.friendname:ride.rider.name}</div>
                    </div>
                    <div className="d-flex align-items-center mb-2 ms-3">
                        <div className="fw-bold">Phone </div > <div> : {ride.friendphone?ride.friendphone:ride.rider.phone}</div>
                    </div>
                    <div className="d-flex align-items-center mb-2 ms-3">
                        <div className="fw-bold">PickUp  </div > <div> : {ride.pickup}</div>
                    </div>
                    <div className="d-flex align-items-center mb-2 ms-3">
                        <div className="fw-bold">Drop  </div > <div>: {ride.drop}</div>
                    </div>
                    <div className="d-flex align-items-center mb-3 ms-3">
                        <div className="fw-bold">Amount </div ><div> : <i class="bi bi-currency-rupee"></i>{ride.fare}</div>
                    </div>
                    <div className="row container-fluid">
                        <button className="btn btn-outline-primary" onClick={(e)=>confirm()}>{c?"Processing...":"Complete"}</button>
                    </div>
                </div>
            </div>



        <div className={`modal fade ${checker ? "show d-block" : ""}`}  tabIndex="-1" role="dialog" aria-hidden="true"style={{ backgroundColor: checker ? "rgba(0,0,0,0.5)" : "" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Enter the OTP Sent to {ride.rider.email}</h5>
                </div>
                    <div class="modal-body">
                        <input type="number" className="form-control" onChange={(e)=>{setNew(e.target.value);setErr("")}}></input>
                         <div style={{color:"red"}} className="mt-3">{err}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal" onClick={(e)=>confirm()}>{con?"sending...":"Resend"}</button>
                        <button type="submit" class="btn btn-sm btn-outline-primary" onClick={(e)=>submit()}>{conf?"Submiting...":"Submit"}</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
        ):""}
        </>
    )
}
}
export default Dride;