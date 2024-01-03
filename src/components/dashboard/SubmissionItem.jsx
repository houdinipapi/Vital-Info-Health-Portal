import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { CircularProgress, Container, Typography, Paper } from '@mui/material';

function SubmissionItem() {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${submissionId}`);
        setSubmission(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching submission:', error);
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [submissionId]);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Typography variant="h4" gutterBottom>
              Submission ID: {submission.id}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {submission.title}
            </Typography>
            <Typography variant="body1">
              {submission.body}
            </Typography>
            {/* You can display more details from the submission object as needed */}
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default SubmissionItem;
