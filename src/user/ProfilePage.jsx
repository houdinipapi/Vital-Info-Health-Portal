import { Avatar, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
let profilePic = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const ProfilePage = () => {
  const ProfileWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    boxShadow: 'none',
  });

  const AvatarImage = styled(Avatar)({
    width: '120px',
    height: '120px',
    marginBottom: '20px',
  });

  return (
    <ProfileWrapper>
      <AvatarImage alt="User Avatar" src={profilePic}/>
      <Paper elevation={3} style={{ padding: '20px', width: 'fit-content' }}>
        <Typography variant="h4">John Doe</Typography>
        <Typography variant="subtitle1" color="textSecondary">Web Developer</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Username:</strong> johndoe</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Email:</strong> johndoe@example.com</Typography>
          </Grid>
        </Grid>
      </Paper>
    </ProfileWrapper>
  );
};

export default ProfilePage;
