    import Cookies from "js-cookie";
    import { jwtDecode } from "jwt-decode";
    import { io } from "socket.io-client";
    import { useNavigate } from "react-router-dom";
    import { MapContainer, TileLayer, useMap,Marker } from "react-leaflet";
    import "leaflet/dist/leaflet.css";
    import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
    import L from "leaflet";
    import "leaflet-routing-machine";
    import auto from './auto.png'
    import Navbar from './usernavbar'
    import motor from './Motorcycle.png'
    import car2 from './car.png'
    import './book.css'
    import {useState,useEffect,useRef} from 'react'

   async function getCoordinates(place) {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
        );
        const data = await response.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
        return null;
        }





   function Routing({ from, to,setDistance ,ride}) {
  const map = useMap();

  useEffect(() => {
    if (!from || !to || !map) return;

    // Remove previous routing if exists
    if (map._routingControl) {
      map.removeControl(map._routingControl);
    }

    let rideIcon;
    if (ride === "bike") rideIcon = L.icon({ iconUrl: motor, iconSize: [40, 40], iconAnchor: [20, 40] });
    else if (ride === "auto") rideIcon = L.icon({ iconUrl: auto, iconSize: [40, 40], iconAnchor: [20, 40] });
    else rideIcon = L.icon({ iconUrl: car2, iconSize: [40, 40], iconAnchor: [20, 40] });



    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      routeWhileDragging: true,
       createMarker: function(i, wp) {
        // i = 0 -> start, i = 1 -> end
        return L.marker(wp.latLng, { icon: rideIcon });
      },
    }).addTo(map);

     routingControl.on("routesfound", (e) => {
      const routes = e.routes;
      if (routes.length > 0) {
        const distance = routes[0].summary.totalDistance; // meters
        setDistance(distance); // pass to parent
      }
    });

    // store reference to remove next time
    map._routingControl = routingControl;

    return () => {
      if (map._routingControl) {
        map.removeControl(map._routingControl);
        map._routingControl = null;
      }
    };
  }, [from, to, map,ride]);

  return null;
}







    function Book(){
        const socket=useRef(null);
        const navi=useNavigate();
        const token=Cookies.get("tokenuser");
        let decode;
        const [distance, setDistance] = useState(0);
        const[ride,setRide]=useState("bike");
        const[fromm,setFromm]=useState();
        const[too,setToo]=useState();
        const[detail,setDetail]=useState({
            driver:{
                name:"",
                phone:""
            }
        });
        const [amount,setAmount]=useState({
            bike:0,
            auto:0,
            car:0
        });
        const[ft,setFt]=useState(0);
        const[check,setCheck]=useState({
            name:"",
            phone:"",
            from:"",
            to:""
        });
        const[chos,setChos]=useState(false);
        const[bo,setBo]=useState(false);
        const[frd,setFrd]=useState(false);
        const[req,setReq]=useState(false);
        const[can,setCan]=useState(false);
        const[no,setNo]=useState(false);
        const[count,setCount]=useState(10);
        const[time,setTime]=useState(false);


        if (!token) {
            navi('/');
            } else {
            try {
                decode = jwtDecode(token);
            } catch (err) {
                console.error("Invalid token:", err.message);
                navi('/');
            }
            }


             const value=useRef({
            vehical:"bike",
            who:"For me",
            fare:0,
            rider:decode?.id||"",
            userName:decode?.name||"",
            userPhone:decode?.phone||""

        });

        async function search(){
            if(!value.current.pickup){
                setCheck({...check,from:"Enter the from"});
            }
            else if(!value.current.drop){
                setCheck({...check,to:"Enter the To"});   
            }
           else{
            setChos(true)
            const f=await getCoordinates(value.current.pickup);
            const t=await getCoordinates(value.current.drop);
            setChos(false)
            if(f!=null && t!==null){
            setFromm(f);
            setToo(t);
            setBo(true);
            }
            else{
                console.log("else")
                setCheck(pre=>({...pre,to:"Invalid location"}))
            }
        }
    }
    useEffect(()=>{
        const km=Math.floor(distance/1000);
            if(km<=7){
                setAmount({
                    bike:km*12,
                    auto:km*15,
                    car:km*22
                })
            }
            else if(km<=50)
             {
           setAmount({
                    bike:km*5,
                    auto:km*8,
                    car:km*12
                })
             }
             else if(km>50)
             {
           setAmount({
                    bike:km*5,
                    auto:km*10,
                    car:km*15
                })
             }
            },[distance,fromm,too])
        useEffect(()=>{
            if(!value.current.from || !value.current.to){
                setAmount(pre=>({...pre,bike:0,auto:0,car:0}));
            }
        },[ft])
        function setvalues(e){
            value.current[e.target.name]=e.target.value;
        }
        function choose(){
            if(value.current.who=="forfriends")
            {
            setFrd(true);
            }else{
                value.current.frdsname="";
                value.current.frdsphone="";
                setFrd(false)
            }
        }

           useEffect(()=>{
            if(time){
                    if(count==0){
                        setTime(false);
                        setCount(10);
                        con();
                    }
                    let timer=setInterval(()=>{
                        setCount(pre=>(pre-1))
                    },1000)
                    return () => clearInterval(timer);
                }

           },[count,time])
        useEffect(()=>{
            if(!decode){
                alert("Token missing login again")
            navi('/')
        }
        else{
            socket.current = io("https://uber-a8pv.onrender.com",{
                auth:{
                    token:token
                }
            });
            socket.current.on('connect',()=>{
                socket.current.emit("user:register", value.current.rider);
                
            });
              socket.current.on("connect_error", (err) => {
                    if (err.message === "xhr poll error") {
                    alert("Connection error");
                    } else {
                    let a = window.confirm("Authentication failed: " + err.message);
                    if (a) navi("/");
                    }
                });

             socket.current.on("no-drivers",(data)=>{
                if(data.message=="Drivers Not avaliable"){
                    setReq(false);
                    setNo(true);
                }
        });
        socket.current.on("ride:accepted",(data)=>{
            if(data){
                setDetail(pre=>({...pre,...data}))
                setTime(true);
            }
        });
        socket.current.on("ride:cancled",(data)=>{
            if(data.message=="cancled_success"){
                setCan(false);
                setReq(false);
            }
        });

        socket.current.on("ride:timecanceld",(data)=>{
            if(data.message=="cancled_success"){
                setTime(false);
                setCan(false);
                setReq(false);
            }
        })

         return () => {
        socket.current.disconnect(); // disconnect when component unmounts
        console.log("Socket disconnected");
    };
}
        },[])
        function order(){
             setNo(false);
        setReq(true);
        socket.current.emit("ride:request",value.current);
        }
        function cancel(){
            setCan(true);
            socket.current.emit("ride:cancel",value.current.rider);
        }
        function canceltime(){
            socket.current.emit("ride:timecancel",value.current.rider);
            setTime(false);
            setReq(false);
            setCan(false);
        }
        function con(){
            socket.current.emit("ride:process",detail._id);
            setTime(false);
            setBo(false);
            setNo(false);
            setReq(false);
            navi('/rides');
        }
         if(!token){
        return(
            navi('/')
        )
    }
    else{
        return(
            <>
            <Navbar name={decode?.name}></Navbar>
            <div className="container-fluid mab">
                <div className="row">
                    <div className="col-md-4 col-12">
                        <input type="text" name="pickup" className="form-control mb-3" placeholder="From" onChange={(e)=>{setvalues(e);setCheck(pre=>({...pre,from:"",to:""}));setFt(ft+1);setBo(false);setNo(false);setReq(false)}} required></input>
                        <div style={{color:"red"}} className="mb-3">{check.from}</div>
                        <input type="text" name="drop" className="form-control mb-3" placeholder="To" onChange={(e)=>{setvalues(e);setCheck(pre=>({...pre,to:""}));setFt(ft-1);setBo(false);setNo(false);setReq(false)}} required></input>
                        <div style={{color:"red"}} className="mb-3">{check.to}</div>
                        <select name="who" className="form-select mb-3" onChange={(e)=>{setvalues(e);choose();setNo(false);setReq(false)}}>
                            <option>For me</option>
                            <option value="forfriends">For friends</option>
                        </select>
                        <div className={`${frd?"d-block":"d-none"}`}>
                            <h5>Friend details</h5>
                            <input type="text" onChange={(e)=>{setvalues(e);setCheck(prev => ({ ...prev, name: "" }))}} value={value.current.friendname} name="friendname"className="form-control mb-3" placeholder="Name"></input>
                            <div style={{color:"red"}} className="mb-2">{check.name}</div>
                            <input type="number" onChange={(e)=>{setvalues(e);setCheck(prev => ({ ...prev, phone: "" }))}} value={value.current.friendphone} name="friendphone" className="form-control mb-3" placeholder="Phone number"></input>
                            <div style={{color:"red"}}>{check.phone}</div>
                        </div>
                        <div className="row container-fluid mb-3">
                                <button className="btn btn-dark search-btn" onClick={(e)=>search()}>{chos?"Searching....":"Search"}</button>
                        </div>
                        {bo?(
                            <>
                                <div className="row container-fluid">
                                        <button className="btn btn-dark mb-2" onClick={(e)=>order()}>{req?"Seraching for a driver...":(<>Book for <i class="bi bi-currency-rupee"></i>{value.current.fare=ride=="bike"?amount.bike:ride=="auto"?amount.auto:ride=="car"?amount.car:0}</>)}</button>
                                        {req?<button className="btn btn-danger mb-2" onClick={(e)=>cancel()}>{can?"Cancelling...":"Cancel"}</button>:""}
                                        {no?<h6>Drivers not available for the current location !</h6>:""}
                                </div> 
                                <div className="mt-3 mb-3 ms-2">
                                    <strong>Distance:</strong> {(distance / 1000).toFixed(2)} km
                                </div>
                        </>):("")}
                    </div>



                     <div className={`modal fade ${time ? "show d-block" : ""}`}  tabIndex="-1" role="dialog" aria-hidden="true"style={{ backgroundColor: time ? "rgba(0,0,0,0.5)" : "" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Your Ride</h5>
                            </div>
                                <div class="modal-body">
                                    {
                                        detail?(<div>
                                            <div className="d-flex align-items-center">
                                                <div className="text-bold">Driver name: </div>{detail.driver.name||""}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="text-bold">Driver phone: </div>{detail.driver.phone||""}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="text-bold">Pickup: </div>{detail.pickup}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="text-bold">Drop: </div>{detail.drop}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="text-bold">Amount: </div><i class="bi bi-currency-rupee"></i>{detail.fare}
                                            </div>
                                            </div>):""
                                    }
                                </div>
                                <div class="modal-footer">
                                    <div className="row container-fluid"><button type="button" class="btn btn-sm btn-outline-danger" data-bs-dismiss="modal" onClick={(e)=>{canceltime();setBo(false)}}>Cancel</button></div>
                                    <div className="row container-fluid"><button type="submit" class="btn btn-sm btn-outline-primary" onClick={(e)=>con()}>Ride start in {count}</button></div>
                                </div>
                            </div>
                        </div>
                    </div>






                    <div className="col-md-4 mb-md-3 mb-4 col-12">
                        <div name="bike"  className={`card mb-3 max-width ${ride=="bike"?"border-dark":""}`} onClick={(e)=>{setRide("bike");value.current["vehical"]="bike"}}>
                            <div class="row g-0">
                                <div class="col-4">
                                    <img src={motor} class="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <div className="d-flex gap-5 mb-2"><h5 class="card-title me-5">Bike</h5>{amount.bike?<div className="fw-bold"><i class="bi bi-currency-rupee"></i>{amount.bike?amount.bike:0}</div>:""}</div>
                                        <p class="card-text">Get your space with a free Air</p>
                                        <p class="card-text"><small class="text-muted">Availabel</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`card mb-md-3 mb-4 max-width ${ride=="auto"?"border-dark":""}`} name="auto" value="auto" onClick={(e)=>{setRide("auto");value.current["vehical"]="auto"}} >
                            <div class="row g-0">
                                <div class="col-4">
                                    <img src={auto} class="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <div className="d-flex gap-5 mb-2"><h5 class="card-title me-5">Auto</h5>{amount.auto?<div className="fw-bold"><i class="bi bi-currency-rupee"></i>{amount.auto?amount.auto:0}</div>:""}</div>
                                        <p class="card-text">Let's get with friends.</p>
                                        <p class="card-text"><small class="text-muted">Availabel</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`card mb-md-3 mb-4 max-width ${ride=="car"?"border-dark":""}`} name="car" value="car" onClick={(e)=>{setRide("car");value.current["vehical"]="car"}} >
                            <div class="row g-0">
                                <div class="col-4">
                                    <img src={car2} class="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <div className="d-flex gap-5 mb-2"><h5 class="card-title me-5">Car</h5>{amount.car?<div className="fw-bold"><i class="bi bi-currency-rupee"></i>{amount.car}</div>:""}</div>
                                        <p class="card-text">Hey Comeon yeah!...</p>
                                        <p class="card-text"><small class="text-muted">Avaliable</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-dark p-2 mb-3">
                                <div className="d-flex justify-content-center align-item-center">Cash on Delivery</div>
                        </div>
                    </div>
                     <div className="col-md-4 col-12" style={{ height: "500px" }}>
                        {bo?(<>
                        {fromm && too && (
                            <MapContainer
                            center={[fromm.lat, fromm.lng]}
                            zoom={7}
                            style={{ height: "100%", width: "100%" }}
                            >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OpenStreetMap contributors"
                            />
                            <Routing from={fromm} to={too} setDistance={setDistance} ride={ride}/>
                            </MapContainer>
                        )}
                        </>):(
                            <>
                             <MapContainer center={[22.5937, 78.9629]} zoom={4} style={{ height: "500px", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                                </MapContainer>
                            </>
                        )}
                    </div>
                </div>
            </div>
            </>
        )
    }
    }
    export default Book;
