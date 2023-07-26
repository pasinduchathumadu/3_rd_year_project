import React, { useState, useEffect } from "react";
import { Tabs, Typography, Grid, Stack, Avatar, Box, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import profile from "../../assests/profile.jpg";
import Header from "../../components/Layout/Header"
import { styled } from '@mui/material/styles';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Complain = () => {

  const input = new Date()
  const date = input.toDateString();

  const [value, setvalue] = useState(0)
  const handleChange = (event, new_value) => {
    setvalue(new_value)
  }
  return (
    <><Header /><div>

      <Grid sx={{ marginTop: '2%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%' }}>
            <Typography>
              Online Store Manager
            </Typography>
            <Typography>
              Today
            </Typography>

            <Typography>
              {date}
            </Typography>

          </div>
          <div style={{ display: 'inline', marginTop: '30px', paddingLeft: '450px' }}>
            <Typography sx={{ color: 'black', fontSize: '24px', fontFamily: 'fantasy', display: 'flex', alignItems: 'center' }}>
              Complain Section

            </Typography>
          </div>

          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <Stack direction="row" spacing={2}>

              <Avatar alt="Travis Howard" src={profile} sx={{ width: 140, height: 140 }} />

            </Stack>

          </div>
        </div>

        <Grid>
          <Box sx={{ width: "90%", marginTop: '15px', marginLeft: '3%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="Tab Component"
              indicatorColor='transparent'
              sx={{ borderRadius: '10px' }}

            >
              <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="Pending Client's Complain" />
              <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="Responded Client's Complain" />
              <Tab sx={{ backgroundColor: value === 2 ? 'orange' : 'white', color: "black" }} label="Add Complain" />
            </Tabs>

          </Box>
        </Grid>
        {value === 0 && (
          <Grid sx={{marginTop:'3%',marginLeft:'3%',marginRight:'7%'}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell >Complain ID:</StyledTableCell>
                    <StyledTableCell >Client </StyledTableCell>
                    <StyledTableCell >Complain Date</StyledTableCell>
                    <StyledTableCell >Complain</StyledTableCell>
                    <StyledTableCell >View</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                      <StyledTableCell align="right">{row.fat}</StyledTableCell>
                      <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                      <StyledTableCell align="right">{row.protein}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
        )}
      </Grid>


    </div></>
  )
}

export default Complain