import Cookies from "js-cookie";


export const registerUser = async (userData, setAccountCreated) => {
  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    console.log(userData);
    console.log(data);

    console.log('Registration successful:', data);

    setAccountCreated(true);
    
  } catch (error) {
    console.error('Error registering user:', error);
  }
};



export const loginUser = async (credentials, setAuth) => {
  try {
    const response = await fetch('http://localhost:5000/login', {
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
    console.log('Login successful:', data);

    setAuth(true);
    // Assuming 'data.token' contains the received token after successful login
    const token = data.token;
    const validatedToken = token.replace(/"/g, '');

    console.log(validatedToken);

    // Set the validatedToken in a cookie using the js-cookie library
    Cookies.set('authToken', validatedToken, { expires: 365 }); // Adjust expiry date as needed

    // Additional actions after successful login
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error during login
  }
};

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
    console.log('Login successful:', data);

    // Assuming 'data.token' contains the received token after successful login
    const token = data.authToken;
    console.log(token);

    setAuth(true);
    
    // Set the validatedToken in a cookie 
    Cookies.set('authToken', token, { expires: 5 }); 

  } catch (error) {
    console.error('Error logging in:', error);
  }
};