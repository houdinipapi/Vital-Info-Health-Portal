import { useState } from 'react';
import {
  Avatar,
  Typography,
  Grid,
  Paper,
  styled,
  TextField,
  Button,
} from '@mui/material';
import { email as userEmail, username } from '../../storage/storage';
import { updateProfileInfo } from '../services/user/userService';

let profilePic =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
  const [newEmail, setNewEmail] = useState(userEmail);
  const [success, setSuccess] = useState(null); // Initialize success state as null

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
    setSuccess(null); // Reset success state when the email changes
  };

  const handleEmailUpdate = async () => {
    try {
      await updateProfileInfo(setNewEmail, setSuccess);
    } catch (error) {
      console.error('Error updating email:', error);
      setSuccess(false);
    }
  };

  return (
    <ProfileWrapper>
      <AvatarImage alt="User Avatar" src={profilePic} />
      <PaperContainer elevation={10}>
        <Typography variant="h6">Hey, {username}</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong> {newEmail}
            </Typography>
            <TextField
              label="New Email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newEmail}
              onChange={handleEmailChange}
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleEmailUpdate}
            >
              Update Email
            </Button>
            {success === true && (
              <Typography variant="body2" style={{ color: 'green' }}>
                Email updated successfully!
              </Typography>
            )}
            {success === false && (
              <Typography variant="body2" style={{ color: 'red' }}>
                Failed to update email.
              </Typography>
            )}
          </Grid>
        </Grid>
      </PaperContainer>
    </ProfileWrapper>
  );
};

export default ProfilePage;
