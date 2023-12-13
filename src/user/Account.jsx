import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const AvatarImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

const PaperContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const Account = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <PaperContent>
        <AvatarImage alt="User Avatar" src="/avatar.png" />
        <Typography variant="h5" gutterBottom>
          John Doe
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Email: johndoe@example.com
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Member since: January 2022
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" fullWidth>
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" color="primary" fullWidth>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </PaperContent>
    </Container>
  );
};

export default Account;
