import MotionWrapper from '../components/animation/Motion';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { username } from '../../storage/storage';

function Dashboard() {
  return (
    <MotionWrapper>
      <main>
        <Typography variant="h5"  sx={{ textAlign: 'start', mt: 4, ml: 4 }}>
          Welcome, {username}
        </Typography>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  View Patient Submissions
                </Typography>
                <Typography>
                  Here you can view all your patient submissions.
                </Typography>
                <Button
                  id='btn-link'
                  component={Link}
                  to="/user/dashboard/submissions"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  View Patient Submissions
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Create New Patient Submission
                </Typography>
                <Typography>
                  Create a new patient submission  here.
                </Typography>
                <Button
                  id='btn-link'
                  component={Link}
                  to="/user/dashboard/new-submission"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Create Patient Submission
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Create New Diagnosis
                </Typography>
                <Typography>
                  Create a new diagnosis here.
                </Typography>
                <Button
                  id='btn-link'
                  component={Link}
                  to="/user/dashboard/new-diagnosis"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Create Diagnosis
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  View Diagnosis Submissions
                </Typography>
                <Typography>
                  Here you can view all your diagnosis submissions.
                </Typography>
                <Button
                  id='btn-link'
                  component={Link}
                  to="/user/dashboard/diagnosis"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  View Diagnosis Submissions
                </Button>
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </main>
    </MotionWrapper>
  );
}

export default Dashboard;
