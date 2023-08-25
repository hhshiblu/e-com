import React, { useEffect } from 'react'
import SignUp from "../component/SignUp.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function SignUpPage() {
  const navigate=useNavigate();
  const {isAuthenticated}=useSelector(state=>state.user)

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <SignUp/>
    </div>
  )
}

export default SignUpPage
