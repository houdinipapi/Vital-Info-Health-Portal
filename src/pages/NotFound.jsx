import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '5rem' }}>
      <Typography variant="h2" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you requested may have been removed or does not exist. Please check the URL or go back to the{' '}
        <Link to="/">homepage</Link>.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;
