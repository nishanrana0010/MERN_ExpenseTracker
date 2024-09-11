import React from "react";
import "../assets/Dashboard.css";

function Navbar() {
  return (
    <div class="nav-bar">
      <div class="navbar-search">
        <input type="text" placeholder="Search..." />
        <img src="icons/search.png" />
      </div>

      <div class="navbar-icons">
        <div class="notification">
          <a href="#">
            <img src="icons/notification.png" />
          </a>
        </div>
        <div class="navbar-profile">
          <a href="#">
            <img src="icons/user.png" alt="Profile Logo" />
          </a>
          <span class="profile-name">Nishan</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
