import Cookies from "js-cookie";

export const routes = [
  {
    path: '/user/dashboard',
    pathname: 'Dashboard',
  },
  {
    path: '/user/dashboard/medicines',
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
    type: "text",
    value: ""
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    value: ""
  },

  {
    label: "Date of Birth",
    name: "dateOfBirth",
    type: "date",
    value: ""
  },
  {
    label: "Age",
    name: "age",
    type: "number",
    value: ""
  },
    {
    label: "Gender",
    name: "gender",
    type: "text",
    value: ""
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    value: ""
  },
  {
    label: "Phone",
    name: "phone",
    type: "tel",
    value: ""
  },

  {
    label: "Address",
    name: "address",
    type: "text",
    value: ""
  },
  {
    label: "City",
    name: "city",
    type: "text",
    value: ""
  },
  {
    label: "County",
    name: "county",
    type: "text",
    value: ""
  },
  {
    label: "Zip Code",
    name: "zip",
    type: "text",
    value: ""
  },
  {
    label: "Blood Group",
    name: "bloodGroup",
    type: "text",
    value: ""
  },
  {
    label: "Height",
    name: "height",
    type: "text",
    value: ""
  },

  {
    label: "Weight",
    name: "weight",
    type: "text",
    value: ""
  },
];



export const username = Cookies.get('username')
export const authToken = Cookies.get("authToken")
export const email = Cookies.get("email")