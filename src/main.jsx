import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#023047'
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
