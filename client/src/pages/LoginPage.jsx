import React, { useEffect } from 'react'
import Login from "../component/Login.jsx"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const navigate=useNavigate();
  const {isAuthenticated}=useSelector(state=>state.user)

  useEffect(() => {
if(isAuthenticated===true){
  navigate("/")
}
  },[]);
  return (
    <div>
   <Login/>
    </div>
  )
}

export default LoginPage
