import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Navbar from "./usernavbar";
import './rides.css'

function Ride() {
  const socket = useRef();
  const navi = useNavigate();
  const token = Cookies.get("tokenuser");
  let decode;
  const [ride, setRide] = useState({ driver: {} });
  const [checker, setCheck] = useState(false);
  const [conf, setConf] = useState(false);
  const con = useRef({});

  if (!token) {
    navi("/");
  } else {
    try {
      decode = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err.message);
      navi("/");
    }
  }

  const user = useRef({
    rider: decode?.id || "",
    userName: decode?.name || "",
  });

  useEffect(() => {
    if (!decode) {
      alert("Token missing login again");
      navi("/");
    } else {
      socket.current = io("https://uber-a8pv.onrender.com", {
        auth: { token: token },
      });

      socket.current.on("connect", () => {
        socket.current.emit("user:register", user.current.rider);
      });

      socket.current.on("connect_error", (err) => {
        if (err.message === "xhr poll error") {
          alert("Connection error");
        } else {
          let a = window.confirm("Authentication failed: " + err.message);
          if (a) navi("/");
        }
      });

      socket.current.emit("getuser:data", user.current.rider);
      socket.current.on("completed", (data) => {
        if (data) setCheck(true);
      });
      socket.current.on("user:vaa", (data) => setRide((pre) => ({ ...pre, ...data })));
      socket.current.on("rate", (data) => {
        if (data.message === "success") navi("/home");
      });

      return () => {
        socket.current.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, []);

  function value(e) {
    con.current[e.target.name] = e.target.value;
  }

  function submit() {
    setConf(true);
    socket.current.emit("rating", {
      rate: con.current,
      userId: user.current.rider,
      driverId: ride.driver._id,
      ride: ride._id,
    });
  }

  if (!token) return;
  if(!ride||!ride._id)
  {
    return(
    <>
    <Navbar name={decode.name}></Navbar>
    <div className="no-ride d-flex flex-column justify-content-center align-items-center text-center">
      <h3 className="fw-bold mb-3">No rides yet!</h3>
      <p className="text-muted mb-4">
        You haven’t booked any rides yet. Start exploring your city with Uber today!
      </p>
      <button
        className="btn btn-dark px-4"
        onClick={() => navi("/book")}
      >
        Browse Rides
      </button>
    </div>
    </>
    );
  }
else{
  return (
    <>
      <Navbar name={decode.name}></Navbar>

      {/* Ride Details */}
      {ride && (
        <div className="container mar1 va">
          <div className="card shadow-lg border-0 rounded-4 ride-details-card">
            <div className="card-body">
              <h5 className="card-title text-center fw-bold mb-3">Ride Details</h5>
              <hr />
              <div className="row mb-2">
                <div className="col fw-bold">Driver Name</div>
                <div className="col">: {ride.driver.name}</div>
              </div>
              <div className="row mb-2">
                <div className="col fw-bold">Driver Phone</div>
                <div className="col">: {ride.driver.phone}</div>
              </div>
              <div className="row mb-2">
                <div className="col fw-bold">Pickup</div>
                <div className="col">: {ride.pickup}</div>
              </div>
              <div className="row mb-2">
                <div className="col fw-bold">Drop</div>
                <div className="col">: {ride.drop}</div>
              </div>
              <div className="row mb-2">
                <div className="col fw-bold">Amount</div>
                <div className="col">
                  : <i className="bi bi-currency-rupee"></i> {ride.fare}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rate Modal */}
      <div
        className={`modal fade ${checker ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ backgroundColor: checker ? "rgba(0,0,0,0.5)" : "" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Rate Completed Ride</h5>
            </div>
            <div className="modal-body">
              <label className="fw-bold">Rate:</label>
              <div className="d-flex gap-3 mb-3 mt-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div className="form-check" key={num}>
                    <input
                      type="radio"
                      value={num}
                      name="rating"
                      className="form-check-input"
                      id={`flexRadio${num}`}
                      onChange={(e) => value(e)}
                    />
                    <label className="form-check-label" htmlFor={`flexRadio${num}`}>
                      {num}
                    </label>
                  </div>
                ))}
              </div>
              <textarea
                placeholder="Any queries..."
                name="comment"
                className="form-control mt-2"
                onChange={(e) => value(e)}
              ></textarea>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setCheck(false)}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submit}
              >
                {conf ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
}

export default Ride;
