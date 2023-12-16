import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./user/Dashboard"
import Layout from "./layouts/Layout"
import MedicinesDashboard from "./user/MedicineDashboard"
import { useEffect, useState } from "react"
import AuthContext from "./context/auth/AuthContext"
import Cookies from "js-cookie"
import Logout from "./auth/Logout"
import Landing from "./pages/Landing"
import LoginPage from "./auth/LoginUser"
import RegisterPage from "./auth/RegisterUser"



function App() {
  const [auth, setAuth] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const readCookie = () => {
    const user = Cookies.get("authToken");
    if(user) {
      setAuth(true)
    } 
  }

  useEffect(() => {
    readCookie();
  },[])
  
  const appRouter = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" Component={Layout} >
        {/* Defaults Routes */}
        <Route index Component={Landing}/>

        {/* Protected Routes */}
        <Route path="/auth/sign-in" Component={LoginPage}/>
        <Route path="/auth/register" Component={RegisterPage}/>
        <Route path="/auth/logout" Component={Logout}/>




        {/* Customer Routes */}
        <Route path="/user/dashboard" Component={Dashboard}/>
        <Route path="/user/medicines" Component={MedicinesDashboard}/>
      </Route>
    )
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, setAccountCreated, accountCreated }}>
      <RouterProvider router={appRouter}/> 
    </AuthContext.Provider>
  )
}

export default App
