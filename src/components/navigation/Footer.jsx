import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../../storage/storage';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#023047',
        color: '#fff',
        textAlign: 'start',
        padding: '20px 0',
        paddingLeft: '20px',
        width: '100%',
      }}
      style={{ marginTop: 'auto' }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Your Hospital Name. All Rights Reserved.
      </Typography>
      {
        routes.map(route => (
          <Box key={route.path} display="flex" flexDirection="row">
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              <Link to={route.path}>{route.pathname}</Link>
            </Typography>
          </Box>
        ))
      }
    </Box>
  );
};

export default Footer;
