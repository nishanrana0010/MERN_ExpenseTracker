import React from "react";
import { Link } from "react-router-dom";
import "../assets/Dashboard.css";

function Sidebar() {
  return (
    <div className="side-bar">
      <h2>Expense Tracker</h2>
      <ul>
        <li>
          <Link to="/dashboard">
            <img src="icons/dashboard.png" alt="Add Dashboard Icon" />
            <br />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/add-expense">
            <img src="icons/expenses.png" alt="Add Expense Icon" />
            <br />
            Add Expense
          </Link>
        </li>
        <li>
          <Link to="/add-income">
            <img src="icons/income.png" alt="Add Income Icon" />
            <br />
            Add Income
          </Link>
        </li>
        <li>
          <Link to="/Categories">
            <img src="icons/tag.png" alt="Add Categories Icon" />
            <br />
            Categories
          </Link>
        </li>

        <li>
          <Link to="/reports">
            <img src="icons/business-report.png" alt="Add Categories Icon" />
            <br />
            Reports/Analytics
          </Link>
        </li>
        <li>
          <a href="#notifications">
            <img src="icons/notification.png" alt="Notifications Icon" />
            <br />
            Notifications/Alerts
          </a>
        </li>
        <li>
          <a href="#settings">
            <img src="icons/settings.png" alt="Settings Icon" />
            <br />
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
