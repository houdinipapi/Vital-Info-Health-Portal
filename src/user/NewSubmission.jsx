/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import { FormData } from '../../storage/storage';
import { TextField, Button, Grid, Container, Box } from '@mui/material';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  age: yup.string().required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required("Address is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
  zip: yup.string().required("zip is required"),
  issue: yup.string().required("issue is required"),
  symptoms: yup.string("symptoms is required").required(),
  bloodGroup: yup.string("bloodGroup is required").required(),
  height: yup.string("height is required").required(),
  nextOfKinsName: yup.string("nextOfKinsName is required").required(),
  weight: yup.string("weight is required").required(),
  AadharId: yup.string("AadharId is required").required(),
  pinCode: yup.string("pinCode is required").required(),
  dateOfRegistration: yup.string("dateOfRegistration is required").required(),
  timeOfRegistration: yup.string("timeOfRegistration is required").required(),
});

const initialValues = {
  firstName: '',
  lastName: '',
  kinName: "",
  dateOfBirth: '',
  age: '',
  email: '',
  phone: '',
  AlternateContactNumber: '',
  address: '',
  city: '',
  county: '',
  zip: '',
  issue: '',
  symptoms: '',
  bloodGroup: '',
  height: '',
  nextOfKinsName: '',
  weight: '',
  AadharId: '',
  pinCode: '',
  dateOfRegistration: '',
  timeOfRegistration: ''
};


const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const NewSubmission = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <h1>Complete the form below</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formikProps => (
            <PatientFormFields formikProps={formikProps} />
          )}
        </Formik>
      </Box>
    </Container>
  );
};

const PatientFormFields = ({ formikProps }) => (
  <form onSubmit={formikProps.handleSubmit}>
    <Grid container spacing={2}>
      {FormData.map((data, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <TextField
            InputLabelProps={{shrink: true}}
            fullWidth
            label={data.label}
            name={data.name}
            type={data.type === 'textarea' ? 'text' : data.type}
            multiline={data.type === 'textarea'}
            rows={data.type === 'textarea' ? 4 : undefined}
            value={formikProps.values[data.name]}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            error={formikProps.touched[data.name] && Boolean(formikProps.errors[data.name])}
            helperText={formikProps.touched[data.name] && formikProps.errors[data.name]}
          />
        </Grid>
      ))}
      <Grid item xs={12} mb={"5rem"}>
        <Button variant="contained" fullWidth type="submit" disabled={formikProps.isSubmitting}>
          Submit
        </Button>
      </Grid>
    </Grid>
  </form>
);

export default NewSubmission;
