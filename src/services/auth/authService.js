import Cookies from "js-cookie";



export const RegisterUser = async (userData, setAccountCreated) => {
  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("REGISTRATION FAILED", response);
    }

    const data = await response.json();
    console.log(data);

    setAccountCreated(true);  
    
  } catch (error) {
    console.error('Error registering user:', error);
  }
};


export const LoginUser = async (credentials, setAuth, setError, setLoginSuccess) => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message)
      return console.log(data.message)
    }

    console.log('Login successful', data);

    // Assuming 'data.authToken' contains the received token after successful login
    const token = data.authToken;

    setLoginSuccess(true);
    setAuth(true);
    
    
    // Set the validatedToken in a cookie 
    Cookies.set('authToken', token, { expires: 5 });
    
    Cookies.set("username", data.username, { expires: 5 }) 
    Cookies.set("email", data.email, { expires: 5 }) 

    setTimeout(() => {
      window.location.reload();
    },1500)

  } catch (error) {
    console.error('Error logging in:', error);
  }
};