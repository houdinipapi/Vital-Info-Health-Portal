import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import { Button, Typography, Container, Box } from "@mui/material";
import MotionWrapper from "../components/animation/Motion";

const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Reset auth status from true to false
    setAuth(false);

    // Remove 'authToken' cookie
    Cookies.remove("authToken");

    // Redirect to the login page after logout
    navigate("/auth/sign-in");
  };

  return (
    <MotionWrapper>

    <Container maxWidth="sm" >
      <Box
      mb={"60%"}
        sx={{
          textAlign: "center",
          marginTop: "50px",
          borderRadius: "5px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
   
        <Typography variant="body1" gutterBottom>
          Are you sure you want to logout?
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
    </MotionWrapper>

  );
};

export default Logout;
