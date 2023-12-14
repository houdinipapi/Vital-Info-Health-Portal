// import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from '../components/navigation/Footer'

function Layout() {
  

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout;
