import Cookies from "js-cookie";
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navi = useNavigate();

  useEffect(()=>{
    // Remove cookie
    Cookies.remove("tokenuser");

    // Optionally disconnect socket if needed
    // socketRef.current?.disconnect();

    // Redirect to login page
    navi("/userlog");
  },[])
  return(
    <>
    </>
  )
}

export default LogoutButton;
