import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filterParam = queryParams.get('filter') || '';

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

  const handleFilterChange = (value) => {
    const searchParams = new URLSearchParams(location.search, {});
    searchParams.set('filter', value);
    navigate(`?${searchParams.toString()}`);
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.title.toLowerCase().includes(filterParam.toLowerCase())
  );

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Submissions
      </Typography>
        <TextField
          fullWidth
          label="Search Medicines"
          value={filterParam}
          onChange={(e) => handleFilterChange(e.target.value)}
          variant="outlined"
          margin="normal"
          placeholder="Filter by title..."
        />

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredSubmissions.map(submission => (
            <ListItem style={{cursor: "pointer"}} key={submission.id} onClick={() => {
              navigate(`/user/dashboard/submissions/${submission.id}`)
            }}>
              <ListItemText primary={submission.title} secondary={submission.body} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SubmissionsPage;
