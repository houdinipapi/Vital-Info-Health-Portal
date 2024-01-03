import  { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField, TablePagination, Container, Typography } from '@mui/material';
import axios from 'axios';
import MotionWrapper from '../components/animation/Motion';
import { useNavigate } from 'react-router-dom';

const MedicinesDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // Change URL to your endpoint
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.title.toLowerCase().includes(filterValue.toLowerCase()) ||
      medicine.id.toString().includes(filterValue.toLowerCase())
  );

  return (
    <MotionWrapper>

      <Container>
        <Typography marginTop={"1rem"} fontSize={"34px"}>Filter Medicines:</Typography>
        <TextField
          fullWidth
          label="Search Medicines"
          value={filterValue}
          onChange={handleFilterChange}
          variant="outlined"
          margin="normal"
        />
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredMedicines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredMedicines
              ).map((medicine) => (
                <TableRow key={medicine.id} style={{cursor: "pointer"}}>
                  <TableCell onClick={() => navigate(`/user/dashboard/medicines/${medicine.id}`)}>{medicine.id}</TableCell>
                  <TableCell onClick={() => navigate(`/user/dashboard/medicines/${medicine.id}`)}>{medicine.title}</TableCell>
                  <TableCell onClick={() => navigate(`/user/dashboard/medicines/${medicine.id}`)}>{medicine.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredMedicines.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
    </MotionWrapper>

  );
};

export default MedicinesDashboard;
