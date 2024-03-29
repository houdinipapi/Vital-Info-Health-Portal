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
        const response = await axios.get('http://localhost:5000/patients/all');
        setSubmissions(response.data.patients); // Access patients array from response.data
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
    submission.data.firstName.toLowerCase().includes(filterParam.toLowerCase()) ||
    submission.data.lastName.toLowerCase().includes(filterParam.toLowerCase()) || 
    submission.data.email.toLowerCase().includes(filterParam.toLowerCase()) || 
    submission.data.age.toLowerCase().includes(filterParam.toLowerCase())
  );

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Submissions
      </Typography>
      <TextField
        fullWidth
        label="Search Patients"
        value={filterParam}
        onChange={(e) => handleFilterChange(e.target.value)}
        variant="outlined"
        margin="normal"
        placeholder="Filter..."
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredSubmissions.map(submission => (
            <ListItem
              style={{ cursor: "pointer" }}
              key={submission.id}
              onClick={() => {
                navigate(`/user/dashboard/submissions/${submission.id}`)
              }}
            >
              <ListItemText
                primary={`${submission.data.firstName} ${submission.data.lastName}`} // Access firstName and lastName from data object
                secondary={`Age: ${submission.data.age}, Email: ${submission.data.email}`} // Example secondary information
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SubmissionsPage;
