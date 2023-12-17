import Cookies from "js-cookie";



export const RegisterUser = async (userData, setAccountCreated) => {
  try {
    const response = await fetch('http://localhost:8080/register', {
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

    Cookies.set("username", data.username, { expires: 5 })
    
  } catch (error) {
    console.error('Error registering user:', error);
  }
};


export const LoginUser = async (credentials, setAuth) => {
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log('Login successful', data);

    // Assuming 'data.token' contains the received token after successful login
    const token = data.authToken;

    setAuth(true);
    
    // Set the validatedToken in a cookie 
    Cookies.set('authToken', token, { expires: 5 });
    
    Cookies.set("username", data.username, { expires: 5 }) 

  } catch (error) {
    console.error('Error logging in:', error);
  }
};