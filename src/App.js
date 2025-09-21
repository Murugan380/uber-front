import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navi from './comnav';
import './btn.css'
import './App.css'
import ab0 from './userfront/ab0.png';
import ab1 from './userfront/ab1.png'
import ab2 from './userfront/ab2.png'
import ab4 from './userfront/ab4.png';
import ab5 from './userfront/ab5.png';
import ab6 from './userfront/ab6.png'
import abz from './userfront/abz.png'
import Footer from './footer' 

export default function RiderDriverButtons() {
  const [active, setActive] = useState("");
  const navi=useNavigate();
   useEffect(() => {
    const token1 = Cookies.get("tokenuser");
    const token2 = Cookies.get("tokendriver");

    if (token1) {
      navi("/home");
    } else if (token2) {
      navi("/driverhome");
    }
  }, [navi]);
  const ANIM_MS = 700;

  function nav(path, btn) {
    setActive(btn);
    setTimeout(() => navi(path), ANIM_MS + 150);
  }

  return (
    <>
    <Navi></Navi>
    <div className="row container-fluid ma" id="home">
      <div className="col-12 col-md-4 mb-md-0 mb-5">
         <div className="d-flex flex-column align-items-center m">
            {/* Rider Button */}
                  <button
              className={`role-btn ${active === "rider" ? "active" : ""}`}
              onClick={() => nav("/userlog", "rider")}
            >
              <i className={`bi bi-sun ${active === "rider" ? "spin" : ""}`}></i>
              <span>Rider</span>
            </button>

            {/* Driver Button */}
            <button
              className={`role-btn ${active === "driver" ? "active" : ""}`}
              onClick={() => nav("/driverlog", "driver")}
            >
              <i className={`bi bi-sun ${active === "driver" ? "spin" : ""}`}></i>
              <span>Driver</span>
            </button>
          </div>
      </div>
      <div className="col-md-2 col-0"></div>
      <div className="col-md-6 col-12  p-md-5 mb-5 mb-md-0">
        <img src={ab0}></img>
      </div>
    </div>
    <div className="row container">
      <div className="col-0"></div>
      <div className="col-md-9">
        <h1>We reimagine the way the world moves for the better</h1>
        <p>Movement is what we power. It’s our lifeblood. It runs through our veins. It’s what gets us out of bed each morning. It pushes us to constantly reimagine how we can move better. For you. For all the places you want to go. For all the things you want to get. For all the ways you want to earn. Across the entire world. In real time. At the incredible speed of now.</p>
      </div>
      <div className="col-md-3 col-0"></div>
      </div>


      <div className="row container-fluid">
        <div className="col-md-6 col-12 mt-5 ms-0 ms-md-4"><img src={ab1}></img></div>
        <div className="col-md-5 col-12  mt-5">
          <h1>Sustainability</h1>
          <p>Uber is committing to becoming a fully electric, zero-emission platform by 2040, with 100% of rides taking place in zero-emission vehicles, on public transit, or with micromobility. It is our responsibility as the largest mobility platform in the world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making transparency a priority and partnering with NGOs and the private sector to help expedite a clean and just energy transition.</p>
        </div>
      </div>

      <div className="row container-fluid mt-5">
        <div className="col-md-6 col-12 mt-5 ms-md-4 ms-0"><img src={ab2}></img></div>
        <div className="col-md-5 col-12  mt-5">
          <h1>Rides and beyond</h1>
          <p>Uber is committing to becoming a fully electric, zero-emission platform by 2040, with 100% of rides taking place in zero-emission vehicles, on public transit, or with micromobility. It is our responsibility as the largest mobility platform in the world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making transparency a priority and partnering with NGOs and the private sector to help expedite a clean and just energy transition.</p><a href="#home">Learn More</a>
        </div>
      </div>

      <div className="row container-fluid">
        <div className="col-md-6 col-12  mt-5 ms-0 ms-md-4">
          <h1>Working together to keep communities safe</h1>
          <p>Whether you’re in the back seat or behind the wheel, your safety is essential. We are committed to doing our part, and technology is at the heart of our approach. We partner with safety advocates and develop new technologies and systems to help improve safety and help make it easier for everyone to get around.</p><a href="#home">Learn More</a>
        </div>
        <div className="col-md-5 col-12 ps-md-5 ps-0 mt-5 mt-md-0"><img src={abz}></img></div>
      </div>

      <h1 className="ms-5 ps-3 summ">Company info</h1>
      <div className="row container-fluid ">
        <div></div>
        <div className="col-md-6 p-4">
          <img src={ab4}></img>
          <h4 className="mt-3">Who's driving Uber</h4>
          <p>We’re building a culture within Uber that emphasizes doing the right thing, period, for riders, drivers, and employees. Find out more about the team that’s leading the way.</p>
        </div>
        <div className="col-md-6 p-4">
          <img src={ab5}></img>
          <h4 className="mt-3">Acting with integrity</h4>
          <p>Uber's Ethics & Compliance Program Charter outlines our commitment to integrity at the highest levels within the company. Transparency is critical to an ethical culture; we achieve this through our Integrity Helpline and suite of scalable and effective compliance initiatives.</p>
          <a href="#home">Learn more</a>
        </div>
      </div>

      <h2 className="ms-5 ps-3 mt-5">Keep up with the latest</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-4"><i class="bi bi-megaphone-fill fs-4"></i>
          <h5 className="mt-4">Newsroom</h5>
          <p>Get announcements about partnerships, app updates, initiatives, and more near you and around the world.</p>
          <a>Go to Newsroom</a>
          </div>
          <div className="col-md-4 mt-4"><i class="bi bi-people-fill fs-4"></i>
          <h5 className="mt-4">Blog</h5>
          <p>Find new places to explore and learn about Uber products, partnerships, and more.</p>
          <a>Read our posts</a>
          </div>
          <div className="col-md-4 mt-4"><i class="bi bi-diagram-3 fs-4"></i>
          <h5 className="mt-4">Investor relations</h5>
          <p>Download financial reports, see next-quarter plans, and read about our corporate responsibility initiatives.</p>
          <a>Learn More</a>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 mt-5">
            <h1 className="frt">Come reimagine with us</h1>
            <a className="btn btn-dark btn-lg mt-3 ms-3" href="#home">Join with Us</a>
          </div>
          <div className="col-md-6 mt-5 mt-md-0 d-flex justify-content-center">
            <img src={ab6}></img>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
