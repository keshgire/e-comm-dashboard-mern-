import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./SignIn.css";

function SignIn() {
    const navigate=useNavigate();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const getData = async () => {
    let data = await fetch("http://localhost:7000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    data=await data.json();
    console.log(data);
    if(data.auth){
        localStorage.setItem('user',JSON.stringify(data.user));
        localStorage.setItem('token',JSON.stringify(data.auth));
        navigate('/');
    }else{
        alert("please enter correct details")
    }
  };

  return (
    <div className="sign-in">
        <h1>Login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button type="button" onClick={getData}>
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
