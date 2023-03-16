import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleData = async () => {
    let data = await fetch("http://localhost:7000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    data = await data.json();
    console.log(data);
    localStorage.setItem('user',JSON.stringify(data.result));
    localStorage.setItem('token',JSON.stringify(data.auth));
    navigate("/");
  };

  return (
    <div className="sign-up">
      <h1>Register Here</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
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
      <button type="button" onClick={handleData}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
