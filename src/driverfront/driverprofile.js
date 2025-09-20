import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

function History() {
  const navi = useNavigate();
  const [checker, setChecker] = useState(false);
  const [conf, setConf] = useState(false);
  const [ar, setAr] = useState(false);
  const token = Cookies.get("tokendriver");
  let decode;
  const [data, setData] = useState({});
  const [con, setCon] = useState();
  const [users, setUser] = useState({});
  const [d, setD] = useState([]);
  const[amo,setAmo]=useState(0);

  if (!token) {
    navi("/driverlog");
  } else {
    try {
      decode = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err.message);
      navi("/driverlog");
    }
  }

  useEffect(() => {
    if (!decode) {
      alert("Token missing login again");
      navi("/driverlog");
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/ridedata`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setData(res.data);
          console.log(res.data);
           const total = res.data.reduce((acc, ride) => acc + (ride.fare || 0), 0);
          setAmo(total);
          if (res.data.message == "invalid Token") {
            alert("invalid token");
            navi("/driverlog");
          }
        })
        .catch((err) => console.log(err));

      axios
        .get(`${process.env.REACT_APP_API_URL}/driverdata`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setD(res.data);
          if (res.data.message == "invalid Token") {
            alert("invalid token");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function update() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/driverd`, {
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
        console.log(err);
        alert("some times wents wrong");
      });
  }

  function subm() {
    setConf(true);
    if (!users.name || !users.address || !users.worklocation) {
      setCon("Please enter all details");
      setConf(false);
    } else if (!/^[6-9][0-9]{9}$/.test(users.phone)) {
      setCon("Invalid phone number");
      setConf(false);
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/driverup`, users, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.message == "success") {
            Cookies.set("tokendriver", res.data.token, {
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

  if (!decode) {
    return;
  } else {
    return (
      <>
        <Navbar name={decode?.name}></Navbar>
        <div className="container m">
          {/* Profile Card */}
          <div className="card shadow-lg border-0 rounded-4 p-3 profile-card">
            <div className="card-body">
              <h4 className="card-title text-center fw-bold mb-3">Driver Profile</h4>
              <hr />
              <div className="row mb-2">
                <div className="col fw-bold">Name</div>
                <div className="col">: {decode?.name}</div>
              </div>
              <div className="row mb-2">
                <div className="col fw-bold">Email</div>
                <div className="col">: {decode?.email}</div>
              </div>
              <div className="row mb-2">
                <div className="col fw-bold">Phone</div>
                <div className="col">: {decode?.phone}</div>
              </div>
              <div className="row mb-2">
                <div className="col fw-bold">Work Location</div>
                <div className="col">: {d.worklocation}</div>
              </div>
              <div className="row mb-4">
                <div className="col fw-bold">Address</div>
                <div className="col">: {d.address}</div>
              </div>
              <div className="row mb-4">
                <div className="col fw-bold">Totaly Earned</div>
                <div className="col">:<i className="bi bi-currency-rupee"></i>{amo}</div>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-dark px-4"
                  onClick={(e) => {
                    update();
                    setChecker(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger px-4"
                  onClick={(e) => navi("/driverforget")}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="card shadow-sm border-0 rounded-4 mt-4 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold">{ar ? "Ride History" : "Show History"}</h5>
              {ar ? (
                <i
                  className="bi bi-arrow-up-short fs-3 cursor-pointer"
                  onClick={(e) => setAr(false)}
                ></i>
              ) : (
                <i
                  className="bi bi-arrow-down-short fs-3 cursor-pointer"
                  onClick={(e) => setAr(true)}
                ></i>
              )}
            </div>

            {ar ? (
              <>
                <hr />
                <div className="row">
                  {data.map((x, i) => {
                    const isLastOdd = i === data.length - 1 && data.length % 2 !== 0;
                    return (
                      <div
                        className={isLastOdd ? "col-12" : "col-12 col-md-6"}
                        key={i}
                      >
                        <div className="card mb-3 border-0 shadow-sm ride-card rounded-4">
                          <div className="card-body">
                            <h6 className="text-center fw-bold">
                              Ride Detail {i + 1}
                            </h6>
                            <hr />
                            <p><b>Rider:</b> {x.friendname ? x.friendname : x.rider.name}</p>
                            <p><b>Driver:</b> {x.driver.name}</p>
                            <p><b>Pickup:</b> {x.pickup}</p>
                            <p><b>Drop:</b> {x.drop}</p>
                            <p><b>Status:</b> {x.status}</p>
                            <p><b>Amount:</b> <i className="bi bi-currency-rupee"></i>{x.fare}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>

          {/* Update Modal */}
          <div
            className={`modal fade ${checker ? "show d-block" : ""}`}
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
            style={{
              backgroundColor: checker ? "rgba(0,0,0,0.5)" : "",
            }}
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
          >
            <div className="modal-dialog">
              <div className="modal-content rounded-4 shadow">
                <div className="modal-header">
                  <h5 className="modal-title">Update Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={(e) => setChecker(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    value={users.name}
                    className="form-control mb-2"
                    name="name"
                    placeholder="Enter Name"
                    onChange={(e) => {
                      setUser({ ...users, [e.target.name]: e.target.value });
                      setCon("");
                    }}
                  />
                  <input
                    type="text"
                    value={users.address}
                    className="form-control mb-2"
                    name="address"
                    placeholder="Enter Address"
                    onChange={(e) => {
                      setUser({ ...users, [e.target.name]: e.target.value });
                      setCon("");
                    }}
                  />
                  <input
                    type="text"
                    value={users.worklocation}
                    className="form-control mb-2"
                    name="worklocation"
                    placeholder="Enter Work Location"
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
                    onClick={(e) => setChecker(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => subm()}
                  >
                    {conf ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default History;
