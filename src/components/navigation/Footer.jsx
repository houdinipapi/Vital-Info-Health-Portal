import { Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '20px 0',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Your Hospital Name. All Rights Reserved.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Built with <Link href="https://mui.com/">Material-UI</Link> and love ❤️
      </Typography>
    </Box>
  );
};

export default Footer;
