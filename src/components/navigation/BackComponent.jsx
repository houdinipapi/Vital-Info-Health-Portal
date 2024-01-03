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
      left:"94%", 
      border: "2px solid black"
      
     }}>
      <IconButton onClick={goBack} aria-label="Go back"  >
        <ArrowBackIcon /> <Typography ml={"1rem"}>back</Typography>
      </IconButton>
    </div>
    
  );
}

export default BackComponent;
