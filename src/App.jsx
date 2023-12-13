import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import SignIn from "./auth/SignSide"
import Dashboard from "./user/Dashboard"
import Layout from "./layouts/Layout"
import MedicinesDashboard from "./user/MedicineDashboard"
import Register from "./auth/Register"
import Account from "./user/Account"
import Support from "./dev/Support"



function App() {
  
  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Layout}>
        <Route index Component={SignIn}/>
        <Route path="/auth/sign-in" Component={SignIn}/>
        <Route path="/auth/register" Component={Register}/>
        <Route path="/user/dashboard" Component={Dashboard}/>
        <Route path="/user/medicines" Component={MedicinesDashboard}/>
        <Route path="/user/account" Component={Account}/>
        <Route path="/dev/support" Component={Support}/>
        

      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={appRouter}/> 
    </>
  )
}

export default App
