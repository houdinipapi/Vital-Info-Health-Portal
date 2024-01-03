import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { CircularProgress, Container, Typography, Paper } from '@mui/material';

 function MedicineItem() {
  const { medicineId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${medicineId}`);
        setSubmission(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching submission:', error);
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [medicineId]);

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
              Medicine ID: {submission.id}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {submission.title}
            </Typography>
            <Typography variant="body1">
              {submission.body}
            </Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
}


export default MedicineItem;