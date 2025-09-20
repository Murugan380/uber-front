import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {useState,useEffect,useRef} from 'react'
import { jwtDecode } from "jwt-decode";
import bike from './Motorcycle.png';
import auto from './auto.png';
import car from './car2.png'
import h1 from './h1.png'
import h3 from './h3.png'
import h4 from './h4.png'
import h5 from './h5.png'
import h6 from './h6.png'
import Navbar from './usernavbar';
import Footer from '../footer'
import './ridebtn.css'
function Photo(){
    const navi=useNavigate();
    const token = Cookies.get("tokenuser");
    let decode;
    const[sh1,setShow1]=useState(false);
    const[sh2,setShow2]=useState(false);
    const[sh3,setShow3]=useState(false);
    const[sh4,setShow4]=useState(false);
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
            useEffect(()=>{
                if(!decode){
                    alert("Token missing login again");
                    navi('/')
                }
            },[])
    if(!token){
        return(
            navi('/')
        )
    }
    else{
    return(
        <>
        <Navbar name={decode?.name}></Navbar>
        <div className="container mah" id="home1">
            <div className="row mb-5">
                <div className="col-md-6 col-12 mb-5 rt">
                    <h1 className="frt text-dark mar me-md-5 me-3">Request a ride for now and later</h1>
                    <a href="/book" class="ride-btn ms-3 mt-3">
                        <span>Get a Ride</span>
                        <span className="arrow">→</span>
                    </a>
                </div>
                <div className="col-md-6 col-12 ">
                    <img src={h1}></img>
                </div>
            </div>
        </div>



            <div className="container-fluid mt-5">
                <h1 className="mb-5">Suggestions</h1>
                <div className="row">
                    <div className="col-md-4">
                        <a class="card t mb-3 max-widtht">
                            <div class="row g-0">
                                <div class="col-4">
                                    <img src={bike} class="img-fluid rounded-start mt-4" alt="..."/>
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Super Bike</h5>
                                        <p class="card-text">“Skip the traffic and zip through the city with a bike ride. Affordable, fast, and perfect for short distances.There’s more than way to move with Uber”</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4">
                         <a class="card t mb-3 max-widtht">
                            <div class="row g-0">
                                <div class="col-4">
                                    <img src={auto} class="img-fluid rounded-start mt-4" alt="..."/>
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Auto with Family</h5>
                                        <p class="card-text">“Hop into a nearby auto for an easy everyday ride. Pocket-friendly fares with flexible routes. Perfect for small groups.”</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4">
                         <a class="card t mb-3 max-widtht">
                            <div class="row g-0">
                                <div class="col-4">
                                    <img src={car} class="img-fluid rounded-start mt-4" alt="..."/>
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Comfort Zone</h5>
                                        <p class="card-text">“Ride in comfort with reliable car options. Great for solo travel or sharing with friends. Enjoy a safe, smooth, and stress-free.”</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>



            <div className="container my-5">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <img src={h6}></img>
                    </div>
                    <div className="col-12 col-md-6 mar1">
                        <h1>Ride with friends seamlessly</h1>
                        <p className="mt-3">Riding with friends just got easier: set up a group ride in the Uber app, invite your friends, and arrive at your destination. Friends who ride together save together.</p>
                        <a href="#home1">Learn more</a>
                    </div>
                </div>
            </div>


            <div className="row container-fluid mb-5">
                    <h1 className="mb-5">Use the Uber app to help you travel your way</h1>
                    <div className="col-md-4 col-12 mb-5">
                        <div className="ms-3">
                        <img src={h3} alt="Ride options"/>
                        <h4 className="mt-3">Ride options</h4>
                        <p>There’s more than one way to move with Uber, no matter where you are or where you’re headed next. Be combined with any other offers.</p>
                        <a className="btn btn-dark" href="#home1">Search ride option</a>
                        </div>
                    </div>

                    <div className="col-md-4 col-12 mb-5">
                        <div className="ms-3">
                        <img src={h4} alt="Another option"/>
                        <h4 className="mt-3">700+ airports</h4>
                        <p>You can request a ride to and from most major airports. Schedule a ride to the airport for one less thing to worry about.</p>
                        <a className="btn btn-dark" href="#home1">Search Airports</a>
                        </div>
                    </div>

                    <div className="col-md-4 col-12 mb-5">
                        <div className="ms-3">
                        <img src={h5} alt="Extra option"/>
                        <h4 className="mt-3">15,000+ cities</h4>
                        <p>The app is available in thousands of cities worldwide, so you can request a ride even when you’re far from home.</p>
                        <a className="btn btn-dark" href="#home1">Search Cities</a>
                        </div>
                    </div>
                </div>
            <div className="container">
                <div className="row mb-5">
                    <h2 className="mb-5">Frequently asked questions</h2>
                    <div className="col-12 ">
                        <div className="d-flex justify-content-between align-items-center gap-3 fw-bold">
                            <span>Can I have a lost item delivered to me?</span>
                            <span
                            className="btn p-0 border-0 bg-transparent"
                            onClick={() => setShow1((pre) => !pre)}
                            >
                            <i className={`bi ${sh1 ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                            </span>
                        </div>

                        {/* Answer row (animated) */}
                        <div className={`answer my-3 ${sh1 ? "open" : ""}`}>
                            <p>The Uber app helps provide a delivery solution that can save you a trip across town, whether it’s for a last-minute birthday gift or your forgotten keys. Just choose Package in the Uber app.</p>
                        </div>
                    </div>
                    <div className="col-12 ">
                        <div className="d-flex justify-content-between align-items-center gap-3 fw-bold">
                            <span>Can I rent a car using Uber?</span>
                            <span
                            className="btn p-0 border-0 bg-transparent"
                            onClick={() => setShow2((pre) => !pre)}
                            >
                            <i className={`bi ${sh2 ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                            </span>
                        </div>

                        {/* Answer row (animated) */}
                        <div className={`answer my-3 ${sh2 ? "open" : ""}`}>
                            <p>Yes. In select cities, Uber offers a service called Uber Rent, which lets you rent a car directly through the Uber app.</p>
                        </div>
                    </div>
                    <div className="col-12 ">
                        <div className="d-flex justify-content-between align-items-center gap-3 fw-bold">
                            <span>Can I request a ride that picks up friends in different locations?</span>
                            <span
                            className="btn p-0 border-0 bg-transparent"
                            onClick={() => setShow3((pre) => !pre)}
                            >
                            <i className={`bi ${sh3 ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                            </span>
                        </div>

                        {/* Answer row (animated) */}
                        <div className={`answer my-3 ${sh3 ? "open" : ""}`}>
                            <p>Yes. With Uber you can add multiple stops to your trip. Before confirming your ride, you can tap “+” in the app to add extra pickup or drop-off locations (up to two additional stops).</p>
                        </div>
                    </div>

                    <div className="col-12 container">
                        <div className="d-flex justify-content-between align-items-center gap-3 fw-bold">
                            <span>Is there an Uber ride option for 5 people?</span>
                            <span
                            className="btn p-0 border-0 bg-transparent"
                            onClick={() => setShow4((pre) => !pre)}
                            >
                            <i className={`bi ${sh4 ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                            </span>
                        </div>

                        {/* Answer row (animated) */}
                        <div className={`answer my-3 ${sh4 ? "open" : ""}`}>
                            <p>Uber makes it easy to get a taxi nearby in the cities where Uber Taxi is available. There’s no need to find a cab stand, hail a cab on the street, or even call the local cab company. Instead, you can use the Uber app or website to request a taxi in just a few taps or clicks.</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                <p>*Join the millions of riders who trust Uber for their everyday travel needs. Get doorstep pickup and dropoff to your chosen destination at the tap of a button. Select from a wide range of affordable options, such as Uber Auto, Uber Moto, and Cabs.</p>
                <p>Limited-period offer- Discount on first 5 trips (cab or moto) completed within 15 days of signing up. The offer is valid only for first-time users only. The promotion shall apply automatically to eligible rides. Download the Uber app now to request your first ride.</p>
                <p>Discounts applicable - (i) For cab rides- 25% discount (maximum discount of INR 75 per ride) (ii) For moto rides- 50% discount (maximum discount of INR 50 per ride)</p>
                <p>This offer cannot be combined with any other offers or promo codes.</p>
                <p>The offer is non-transferrable and limited to one per user/account.</p>
                <p>Uber reserves the right to alter, suspend or withdraw the promotion offer in the future in its sole discretion without any prior notice. Terms and conditions apply.</p>
                </div>
            </div>
        <Footer></Footer>
        </>
    )
}
}
export default Photo;