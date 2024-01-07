import { useState } from 'react';
import { FormData } from '../../storage/storage';
import { TextField, Button, Grid, Container, Box } from '@mui/material';
import { NewSubmissions } from '../services/submissions/submissionService';

const initialValues = {
  firstName: '',
  lastName: '',
  kinName: '',
  dateOfBirth: '',
  age: '',
  email: '',
  phone: '',
  AlternateContactNumber: '',
  address: '',
  city: '',
  county: '',
  zip: '',
  bloodGroup: '',
  height: '',
  nextOfKinsName: '',
  weight: '',
  AadharId: '',
  gender: '',
  pinCode: '',
  dateOfRegistration: '',
  timeOfRegistration: '',
};

const NewSubmission = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      console.log('Form values:', formValues);
      alert(JSON.stringify(formValues, null, 2));
      
      await NewSubmissions(formValues);
      
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

  return (
    <Container maxWidth="md">
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
