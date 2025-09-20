import Cookies from "js-cookie";
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navi = useNavigate();

  useEffect(()=>{
    // Remove cookie
    Cookies.remove("tokendriver");

    // Optionally disconnect socket if needed
    // socketRef.current?.disconnect();

    // Redirect to login page
    navi("/driverlog");
  },[])
  return(
    <>
    </>
  )
}

export default LogoutButton;
