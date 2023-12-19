import Cookies from "js-cookie";

export const routes = [
  {
    path: '/user/dashboard',
    pathname: 'Dashboard',
  },
  {
    path: '/user/medicines',
    pathname: 'Medicines',
  },
  {
    path: '/auth/sign-in',
    pathname: 'Sign In',
  },
  {
    path: '/auth/register',
    pathname: 'Register',
  },
   {
    path: '/user/profile',
    pathname: "profile"
  },
  {
    path: '/auth/logout',
    pathname: 'log out',
  },
 
];

export const siteName = "Vital Hospital Portal"


export const FormData = [
  {
    label: "First Name",
    name: "firstName",
    type: "text"
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text"
  },
  {
    label: "Date of Birth",
    name: "dateOfBirth",
    type: "date"
  },
  {
    label: "Age",
    name: "age",
    type: "number"
  },
  {
    label: "Email",
    name: "email",
    type: "email"
  },
  {
    label: "Phone",
    name: "phone",
    type: "tel"
  },
  {
    label: "Address",
    name: "address",
    type: "text"
  },
  {
    label: "City",
    name: "city",
    type: "text"
  },
  {
    label: "State",
    name: "state",
    type: "text"
  },
  {
    label: "Zip Code",
    name: "zip",
    type: "text"
  },
  {
    label: "Issue",
    name: "issue",
    type: "textarea"
  },
  {
    label: "Symptoms",
    name: "symptoms",
    type: "textarea"
  },
];


export const username = Cookies.get('username')