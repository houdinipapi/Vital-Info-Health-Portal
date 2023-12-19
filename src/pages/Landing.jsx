import { Box } from "@mui/material";
import "../styles/App.css"

import DoctorImage from '../assets/undraw_doctors_p6aq.svg'
import MotionWrapper from "../components/animation/Motion";
import { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";


function Landing() {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate("/user/dashboard")
  })
  return (
    <MotionWrapper>
     <Box className="landing-main">
        <section>
          <div className="heading-text">
            <h2>Health Records</h2>
            <h4>orem ipsum dolor sit amet, consectetur adipiscing elit. Nam in ultrices orci. Pellentesque lacinia neque in nunc tempor, at eleifend.</h4>
          </div>
          <div className="heading-img-right">
            <img src={DoctorImage}/>
          </div>
        </section>
      </Box>
    </MotionWrapper>

  )
}

export default Landing;