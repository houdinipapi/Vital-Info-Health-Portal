import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const DiagnosisPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filterParam = queryParams.get('filter') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/diagnosis/all');
        setSubmissions(response.data.all_diagnosis);
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
    submission.data.diagnosis_description.toLowerCase().includes(filterParam.toLowerCase())
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
        placeholder="Filter by description..."
      />

      {loading ? (
          <CircularProgress />
        ) : (
          <>
            {filteredSubmissions.map(submission => (
              <div key={submission.id} style={{ margin: '1rem 0', cursor: 'pointer' }} onClick={() => navigate("/user/dashboard/submissions/" + submission.patient_id)}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {submission.data.diagnosis_type}
                    </Typography>
                    <Typography color="textSecondary">
                      {submission.data.diagnosis_description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </>
        )}
    </Container>
  );
};

export default DiagnosisPage;
