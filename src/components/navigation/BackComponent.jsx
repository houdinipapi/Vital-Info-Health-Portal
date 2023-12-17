import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { useContext } from 'react';

function BackComponent() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const goBack = () => {
    if(!auth) navigate("/auth/sign-in")
    else navigate(-1); 
  };

  return (
    <div style={{ 
      position:'fixed',
      top:"93.5vh", 
      background: "rgb(0,0,0,0.4)",
      backdropFilter: "blur(10px)",
      
     }}>
      <IconButton onClick={goBack} aria-label="Go back"  >
        <ArrowBackIcon /> <Typography ml={"1rem"} color={"white"}>back</Typography>
      </IconButton>
    </div>
    
  );
}

export default BackComponent;
