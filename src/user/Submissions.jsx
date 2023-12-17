import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setSubmissions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Submissions
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {submissions.map(submission => (
            <ListItem key={submission.id}>
              <ListItemText primary={submission.title} secondary={submission.body} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SubmissionsPage;
