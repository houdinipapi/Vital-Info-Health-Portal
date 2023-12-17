// import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import BackComponent from '../components/navigation/BackComponent'

function Layout() {

  return (
    <div>
        <Navbar/>
        <BackComponent/>
        <div>
          <Outlet/>
        </div>
        
    </div>
  )
}
export default Layout;
