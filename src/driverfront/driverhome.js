import '../App.css';
import Cookies from "js-cookie";
import { io } from "socket.io-client";
 import { useNavigate } from "react-router-dom";
import {useState,useEffect,useRef} from 'react'
import { jwtDecode } from "jwt-decode";
import Navbar from './navbar'
import Footer from '../footer'
import m1 from '../userfront/earn.png'
import m2 from '../userfront/earn2.png'
import m3 from '../userfront/earn3.png'
import m4 from '../userfront/earn4.png'
import m5 from '../userfront/earn5.png'
function Driverhome(){
    const navi=useNavigate();
      const socketRef = useRef(null);
    const token=Cookies.get("tokendriver")
    let decode;
    const[ridee,setRidee]=useState({
        rider:{

        }
    });
    const[ac,setAc]=useState(false);
    const[apt,setApt]=useState(false);
    const[off,setOff]=useState(false);
    const[count,setCount]=useState(10);
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
        const [drive,setDrive]=useState({
        driver:decode?.id||"",
        driverName:decode?.name||"",
        driverphone:decode?.phone||""
    });
    useEffect(()=>{
        if(!decode){
            alert("Token missing login again")
            navi('/driverlog')
        }
        socketRef.current = io(process.env.REACT_APP_API_URL,
            {
                auth:{
                    token:token
                }
            }
        );
       socketRef.current.on("connect", () => {
      socketRef.current.emit("driver:register", { driverId:drive.driver});
    });

     socketRef.current.on("connect_error", (err) => {
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

     socketRef.current.on("ride:offer",(ride)=>{
        setAc(true);
        setOff(true);
        setRidee({...ridee,...ride});
        console.log("details",ride);
    });
    socketRef.current.on("ride:cancled",(data)=>{
        console.log(data);
        if(data)
        {
        setAc(false);
        }
    })
    socketRef.current.on("ride:timecancled",(data)=>{
        if(data.message=="timecancle"){
            setAc(false);
            setApt(false)
            alert("Rided Cancled")
        }
    })

    socketRef.current.on("ride:va",(data)=>{
        if(data.message=="success"){
            setApt(false);
             setCount(10);
            navi('/drides')
        }
    })

     return () => {
        socketRef.current.disconnect(); // disconnect when component unmounts
        console.log("Socket disconnected");
    };
},[]);


useEffect(() => {
    if (!off) return;

    if (count === 0) {
        reject(); 
        return;
    }

    const timer = setInterval(() => {
        setCount((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(timer);
}, [off, count]);


function accept(){
    setOff(false);
    const d=drive.driver;
    const r=ridee._id
    const or={d,r}
    socketRef.current.emit("ride:confirm",or);
    setApt(true);
}
function reject(){
    const d=drive.driver;
    const r=ridee._id;
     const u=ridee.rider?._id;
    const or={d,r,u}
    socketRef.current.emit("ride:reject",or);
    setAc(false);
    setCount(10);
    setRidee({});
}
if(!decode){
    return;
}
else {
    return (
        <>
            <Navbar name={decode?.name}></Navbar>
            <div className="m container">
                <h2 >Welcome <span className="dtext">{decode?.name}</span></h2>
                <p className="text-muted">Manage your rides, earnings, and opportunities all in one place.</p>
            </div>

            {/* Ride offer modal stays same */}
            <div
                className={`modal fade ${ac ? "show d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                style={{ backgroundColor: ac ? "rgba(0,0,0,0.5)" : "" }}
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Ride Details</h5>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center">
                                <div className="fw-bold me-2">Rider name:</div>
                                <div>{ridee.friendname ? ridee.friendname : ridee.rider?.name}</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="fw-bold me-2">Rider phone:</div>
                                <div>{ridee.friendphone ? ridee.friendphone : ridee.rider?.phone}</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="fw-bold me-2">Pickup:</div>
                                <div>{ridee.pickup}</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="fw-bold me-2">Drop:</div>
                                <div>{ridee.drop}</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="fw-bold me-2">Amount:</div>
                                <div><i className="bi bi-currency-rupee"></i>{ridee.fare}</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {!apt && (
                                <button className="btn btn-outline-danger" onClick={reject}>
                                    Reject in {off ? count : ""}
                                </button>
                            )}
                            <button onClick={accept} className="btn btn-outline-primary">
                                {apt ? "Confirming ride...." : "Accept"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Driver Home Content */}
            <div className="container my-5">
                <div className="row mb-5 align-items-center">
                    <div className="col-md-6 mb-2">
                        <img src={m1} className="img-fluid " alt="Earnings" />
                    </div>
                    <div className="col-md-6 ms-3 ms-md-0">
                        <h2>Earn on your own schedule</h2>
                        <p>Drive when you want, where you want. With Uber, you’re in control of your schedule and your earnings.</p>
                        <a className="btn btn-dark" href="/dprofile">View Earnings</a>
                    </div>
                </div>

                <div className="row mb-5 align-items-center">
                    <div className="col-md-6 order-md-2">
                        <img src={m2} className="img-fluid" alt="Support" />
                    </div>
                    <div className="col-md-6 order-md-1">
                        <h2>Support when you need it</h2>
                        <p>Get 24/7 support through the app. From trip issues to account help, Uber is here to keep you moving smoothly.</p>
                        <a href="#help" className="btn btn-outline-dark">Get Help</a>
                    </div>
                </div>
                </div>
                <div className="container-fluid">
                <div className="row text-center mb-5">
                    <h2 className="mb-4">Why drive with Uber?</h2>
                    <div className="col-md-4 col-12 mb-4">
                        <img src={m3} className="mb-3" alt="Flexibility"  />
                        <h5 className="fw-bold">Flexibility</h5>
                        <p>Set your own schedule and decide when to drive.</p>
                    </div>
                    <div className="col-md-4 col-12 mb-4">
                        <img src={m4} className="mb-3" alt="Earnings"  />
                        <h5 className="fw-bold">Weekly Earnings</h5>
                        <p>Track your trips and earnings directly in the Uber Driver app.</p>
                    </div>
                    <div className="col-md-4 col-12 mb-4">
                        <img src={m5} className="mb-3" alt="Rewards"  />
                        <h5 className="fw-bold">Driver Rewards</h5>
                        <p>Earn points and unlock discounts on fuel, vehicle maintenance, and more.</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

}
export default Driverhome;