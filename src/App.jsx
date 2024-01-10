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
import NotFound from "./pages/NotFound"
import SubmissionsPage from "./user/Submissions"
import NewSubmission from "./user/NewSubmission"
import ProfilePage from "./user/ProfilePage"
import SubmissionItem from "./components/dashboard/SubmissionItem"
import MedicineItem from "./components/dashboard/MedicineItem"

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
        <Route path="*" Component={NotFound}/>


        {/* Protected Routes */}
        <Route path="/auth/sign-in" Component={LoginPage}/>
        <Route path="/auth/register" Component={RegisterPage}/>
        <Route path="/auth/logout" Component={Logout}/>

        {/* Customer Routes */}
        <Route path="/user/dashboard" Component={Dashboard}/>
        <Route path="/user/profile" Component={ProfilePage}/>

        <Route path="/user/dashboard/medicines" Component={MedicinesDashboard}/>
        <Route path="/user/dashboard/medicines/:medicineId" Component={MedicineItem}/>

        <Route path="/user/dashboard/new-submission" Component={NewSubmission}/>
        <Route path="/user/dashboard/submissions" Component={SubmissionsPage}/>
        <Route path="/user/dashboard/submissions/:patientId" Component={SubmissionItem}/>

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
