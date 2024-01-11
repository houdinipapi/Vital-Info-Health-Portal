import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Container, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from 'react-router-dom';
import { FormDataDiagnosis } from '../../../storage/storage';
import { NewDiagnosisService } from '../../services/submissions/submissionService';


const initialValues = {
  diagnosis_type: '',
  diagnosis_description: '', 
  patient_id: '', 
};


const NewDiagnosis = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      // Create the diagnosis object from formValues
      const diagnosisObject = {
        patient_id: formValues.patient_id,
        data: {
          diagnosis_type: formValues.diagnosis_type,
          diagnosis_description: formValues.diagnosis_description
        }
      };

      console.log('Diagnosis object:', diagnosisObject);
      // alert(JSON.stringify(diagnosisObject, null, 2));

      // Pass the diagnosis object to NewDiagnosisService
      await NewDiagnosisService(diagnosisObject, setSubmitSuccess);

    } else {
      e.target.reportValidity();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  useEffect(() => {
    if(submitSuccess) {
      toast.success("Patient submitted successfully!!")
      navigate('/')
    }
  },[navigate, submitSuccess])

  return (
    <Container maxWidth="md">
      <ToastContainer autoClose={2000} theme='light' position='top-left' closeOnClick pauseOnHover/>
      <Box sx={{ mt: 4 }}>
        <h1>Complete the form below</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {FormDataDiagnosis.map((data, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label={data.label}
                  name={data.name}
                  type={data.type === 'textarea' ? 'text' : data.type}
                  multiline={data.type === 'textarea'}
                  rows={data.type === 'textarea' ? 4 : undefined}
                  value={formValues[data.name]}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            ))}
            <Grid item xs={12} mb={'5rem'}>
              <Button variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default NewDiagnosis;
