import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
// import { useNavigate } from "react-router-dom";
import "../assets/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-dashboard">
        <Navbar />
        <Container />
      </div>
    </div>
  );
}
export default Dashboard;
