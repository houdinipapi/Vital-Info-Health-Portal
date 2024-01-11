import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { CircularProgress, Container, Typography, Paper, Box, Divider } from '@mui/material';

function PatientDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/patients/${patientId}`);
        setPatient(response.data.patient);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient:', error);
        setLoading(false);
      }
    };

    const fetchPatientDiagnosis = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/diagnosis/${patientId}`);
        setDiagnosis(response.data.diagnosis);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient diagnosis:', error);
        setLoading(false);
      }
    }

    fetchPatient();
    fetchPatientDiagnosis();
  }, [patientId]);

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
              Patient ID: {patient.id}
            </Typography>
            <Divider />
            <Box mt={2}>
              <Typography variant="h5" gutterBottom>
                {`${patient.data.firstName} ${patient.data.lastName}`}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: {patient.data.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Age: {patient.data.age}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date of Birth: {patient.data.dateOfBirth}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Blood Group: {patient.data.bloodGroup}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Address: {patient.data.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                County: {patient.data.county}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Height: {patient.data.height}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Weight: {patient.data.weight}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date of Registration: {patient.dateOfRegistration}
              </Typography>

            </Box>
            <div>Diagnosis</div>
            <section>
              {/* Render diagnosis here */}
            </section>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default PatientDetails;
