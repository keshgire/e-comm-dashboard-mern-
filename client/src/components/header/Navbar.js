import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  let newAuth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img className="logo" src="https://wallpapercave.com/wp/wp2252568.jpg" alt="logo" />
      { newAuth ?
      <ul className="ul-nav">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add">Add Products</Link>
        </li>
        <li>
          <Link to="/update/:id">Update Products</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

            <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(newAuth).name})
            </Link>
          </li>
     
     
      </ul>
      :
      <ul className="ul-nav nav-right">
        <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
        </ul>
}
    </div>
  );
}

export default Navbar;
