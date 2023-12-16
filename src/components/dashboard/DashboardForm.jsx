import { Box, TextField, Button } from '@mui/material';

const DashboardForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Field 1" variant="outlined" fullWidth margin="normal" />
      <TextField label="Field 2" variant="outlined" fullWidth margin="normal" />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default DashboardForm;
