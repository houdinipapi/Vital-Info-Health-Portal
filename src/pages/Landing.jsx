import { Box } from "@mui/material";
import "../styles/App.css";

import MotionWrapper from "../components/animation/Motion";
import { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { siteName } from "../../storage/storage";
import doctorEnteringInfo from "../assets/doctor-entering-info.png"; // Import the image

function Landing() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate("/user/dashboard");
  }, [auth, navigate]);

  return (
    <MotionWrapper>
      <Box className="landing-main">
        <section>
          <div className="heading-text">
            <h1 style={{ width: "600px", fontSize: "60px", fontWeight: "bolder" }}>Vital Hospital Portal</h1>
            <h4 style={{fontSize: "25px"}}>
              Welcome to , {siteName} please create an account to access your vital health information
            </h4>
          </div>
          <div style={{ width: "100vw" }} className="heading-img-right">
            <img
              style={{
                width: "550px",
                height: "550px",
                marginLeft: "5.7rem",
                mixBlendMode: "darken",
                border: "none", // Remove image border
              }}
              src={doctorEnteringInfo}
              alt="doctor entering information"
            />
          </div>
        </section>
      </Box>
    </MotionWrapper>
  );
}

export default Landing;
