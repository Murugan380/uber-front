import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import UserNavbar from "./usernavbar";

function History() {
  const navi = useNavigate();
  const [checker, setChecker] = useState(false);
  const [conf, setConf] = useState(false);
  const [ar, setAr] = useState(false);
  const token = Cookies.get("tokenuser");
  let decode;
  const [data, setData] = useState({});
  const [con, setCon] = useState();
  const [users, setUser] = useState({});
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

  useEffect(() => {
    if (!decode) {
      alert("Token missing login again");
      navi("/");
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/userdata`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setData(res.data);
          if (res.data.message == "invalid Token") {
            alert("invalid token");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function update() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/userd`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res) {
          setUser(res.data);
        } else {
          alert("some time wents wrong");
        }
      })
      .catch((err) => {
        setConf(false);
        alert("some times wents wrong");
      });
  }

  function subm() {
    setConf(true);
    if (!users.name) {
      setCon("Please enter all details");
      setConf(false);
    } else if (!/^[6-9][0-9]{9}$/.test(users.phone)) {
      setCon("Invalid phone number");
      setConf(false);
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/userup`, users, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.message == "success") {
            Cookies.set("tokenuser", res.data.token, {
              expires: 7,
              secure: true,
              sameSite: "strict",
            });
            window.location.reload(true);
          } else {
            setConf(false);
            alert("some times wents wrong");
          }
        })
        .catch((err) => alert("Network error"));
    }
  }

  if (!token) {
    return;
  } else {
    return (
      <>
        <UserNavbar name={decode?.name}></UserNavbar>

        <div className="container mar mab">
          <div className="card shadow-lg border-0 rounded-4 profile-card">
            <div className="card-body">
              <h4 className="card-title text-center fw-bold text-primary">
                My Profile
              </h4>
              <hr />

              <div className="mb-3">
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="fw-semibold">Name</span>
                  <span>{decode.name}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="fw-semibold">Email</span>
                  <span>{decode.email}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="fw-semibold">Phone</span>
                  <span>{decode.phone}</span>
                </div>
              </div>

              <div className="row text-center">
                <div className="col-6">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => {
                      update();
                      setChecker(true);
                    }}
                  >
                    Update
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => navi("/forget")}
                  >
                    Change Password
                  </button>
                </div>
              </div>

              {/* Ride History Toggle */}
              <div className="history-section mt-5">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold">{ar ? "Hide" : "Show"} Ride History</h5>
                  {ar ? (
                    <i
                      className="bi bi-arrow-up-circle fs-4 text-primary"
                      onClick={() => setAr(false)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-arrow-down-circle fs-4 text-primary"
                      onClick={() => setAr(true)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  )}
                </div>

                {ar && (
                  <>
                    <hr />
                    <div className="row">
                      {data.map((x, i) => {
                        const isLastOdd =
                          i === data.length - 1 && data.length % 2 !== 0;
                        return (
                          <div
                            key={i}
                            className={isLastOdd ? "col-12" : "col-12 col-md-6"}
                          >
                            <div className="card ride-card shadow-sm mb-3">
                              <div className="card-body">
                                <h6 className="card-title text-center text-dark fw-bold">
                                  Ride #{i + 1}
                                </h6>
                                <hr />
                                <p>
                                  <strong>Rider Name: </strong>
                                  {x.friendname ? x.friendname : x.rider.name}
                                </p>
                                <p>
                                  <strong>Rider Phone: </strong>
                                  {x.friendphone ? x.friendphone : x.rider.phone}
                                </p>
                                <p>
                                  <strong>Driver Name: </strong> {x.driver.name}
                                </p>
                                <p>
                                  <strong>Vehicle: </strong> {x.driver.vehicaltype}
                                </p>
                                <p>
                                  <strong>Pickup: </strong> {x.pickup}
                                </p>
                                <p>
                                  <strong>Drop: </strong> {x.drop}
                                </p>
                                <p>
                                  <strong>Status: </strong> {x.status}
                                </p>
                                <p>
                                  <strong>Fare: </strong>{" "}
                                  <i className="bi bi-currency-rupee"></i> {x.fare}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Update Modal */}
        <div
          className={`modal fade ${checker ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          style={{ backgroundColor: checker ? "rgba(0,0,0,0.5)" : "" }}
        >
          <div className="modal-dialog">
            <div className="modal-content rounded-4 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Update Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setChecker(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={users.name}
                  className="form-control mb-3"
                  name="name"
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setUser({ ...users, [e.target.name]: e.target.value });
                    setCon("");
                  }}
                />
                <input
                  type="number"
                  value={users.phone}
                  className="form-control"
                  name="phone"
                  placeholder="Enter Phone"
                  onChange={(e) => {
                    setUser({ ...users, [e.target.name]: e.target.value });
                    setCon("");
                  }}
                />
                <div style={{ color: "red" }} className="mt-2">
                  {con}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setChecker(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => subm()}
                >
                  {conf ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default History;
