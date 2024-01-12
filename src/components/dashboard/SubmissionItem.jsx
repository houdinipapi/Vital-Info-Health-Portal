import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { CircularProgress, Container, Typography, Paper, Box, Divider } from '@mui/material';

function PatientDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get(`http://localhost:5000/patients/${patientId}`);
        setPatient(patientResponse.data.patient);

        const diagnosisResponse = await axios.get(`http://localhost:5000/diagnosis/${patientId}`);
        setDiagnosis(diagnosisResponse.data.diagnosis);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
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
            {patient ? (
              <>
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
              </>
            ) : (
              <div>The patient does not exist</div>
            )}

            <div>
              <hr/>
              {typeof diagnosis.map === 'function' ? (
                diagnosis.map((item, index) => (
                  <div key={index}>
                    <Typography variant="body1" gutterBottom>
                      Diagnosis Type: {item.data.diagnosis_type}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Diagnosis Description: {item.data.diagnosis_description}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Diagnosis Date: {item.date}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Patient Id: {item.patient_id}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Diagnosis Id: {item.id}
                    </Typography>
                    <Divider />
                  </div>
                ))
              ) : (
                <div>{diagnosis && diagnosis.diagnosis}</div>
              )}
            </div>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default PatientDetails;
