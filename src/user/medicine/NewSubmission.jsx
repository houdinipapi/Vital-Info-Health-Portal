import { useEffect, useState } from 'react';
import { FormData } from '../../storage/storage';
import { TextField, Button, Grid, Container, Box } from '@mui/material';
import { NewSubmissions } from '../services/submissions/submissionService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from 'react-router-dom';



const initialValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  age: '',
  email: '',
  phone: '',
  address: '',
  county: '',
  bloodGroup: '',
  height: '',
  weight: '',
  city: '', // Missing in the form but present in the schema
  zip: '', // Missing in the form but present in the schema
  gender: '', // Missing in the form but present in the schema
};


const NewSubmission = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      console.log('Form values:', formValues);
      alert(JSON.stringify(formValues, null, 2));
      
      await NewSubmissions(formValues, setSubmitSuccess);
      
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
      navigate('/user/submissions')
    }
  },[navigate, submitSuccess])

  return (
    <Container maxWidth="md">
      <ToastContainer autoClose={2000} theme='light' position='top-left' closeOnClick pauseOnHover/>
      <Box sx={{ mt: 4 }}>
        <h1>Complete the form below</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {FormData.map((data, index) => (
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

export default NewSubmission;
