import { Avatar, Typography, Grid, Paper, styled } from '@mui/material';
import { email, username } from '../../storage/storage';

let profilePic = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

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

const PaperContainer = styled(Paper)({
  padding: '20px',
  width: 'fit-content',
});

const ProfilePage = () => {
  return (
    <ProfileWrapper>
      <AvatarImage alt="User Avatar" src={profilePic}/>
      <PaperContainer elevation={3}>
        <Typography variant="h4">{"John Doe"}</Typography>
        <Grid container spacing={2} justifyContent="center" textAlign={"center"}>
          <Grid item xs={12}>
            <Typography variant="h5"><strong>Username</strong> {username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5"><strong>Email:</strong> {email}</Typography>
          </Grid>
        </Grid>
      </PaperContainer>
    </ProfileWrapper>
  );
};

export default ProfilePage;
