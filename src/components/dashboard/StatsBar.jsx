import  { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import "../../styles/dashboard/StatsBar.css"

const StatsBar = () => {
  const [locationTemperature, setLocationTemperature] = useState('');


  const fetchLocationTemperature = () => {
    // Simulated fetching temperature from an API (replace this with your API call)
    // For simplicity, setting a random temperature here
    const temperature = Math.floor(Math.random() * 40) + 1; // Random temperature between 1°C to 40°C
    setLocationTemperature(`${temperature}°C`);
  };

  const handleFetchTemperature = () => {
    fetchLocationTemperature();
  };

  return (
    <Box id="stats-main" sx={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <Box id="temp-stat">
        <Typography variant="body1">Current Date: {new Date().toLocaleDateString()}</Typography>
        <Box sx={{ marginTop: '10px' }}>
          <TextField
            label="Location Temperature"
            value={locationTemperature}
            disabled
            sx={{ width: '120px' }}
          />
          <Button variant="contained" onClick={handleFetchTemperature} sx={{ marginLeft: '10px' }}>
            Fetch Temperature
          </Button>
        </Box>
      </Box>
      <Box id="">
      </Box>
    </Box>
  );
};

export default StatsBar;
