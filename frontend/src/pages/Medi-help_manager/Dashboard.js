
import React, { useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ProfilePicture from '../../assests/profile-picture.png';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableHead, TableRow, TableBody, TableCell, Button } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import TableViewIcon from '@mui/icons-material/TableView';
import { ResponsiveChartContainer, LinePlot, useDrawingArea} from '@mui/x-charts';

const StyledPath = styled('path')(({ theme }) => ({
    fill: 'none',
    stroke: theme.palette.text.primary,
    shapeRendering: 'crispEdges',
    strokeWidth: 2,
    pointerEvents: 'none',
  }));
  
  const StyledText = styled('text')(({ theme }) => ({
    stroke: 'none',
    fill: theme.palette.text.primary,
    shapeRendering: 'crispEdges',
  }));
function DrawingAreaBox() {
    const { left, top, width, height } = useDrawingArea();
    return (
      <React.Fragment>
        <StyledPath
          d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`}
        />
        <circle cx={left} cy={top} r={3} style={{ fill: 'orange' }} />
        <circle cx={left + width} cy={top + height} r={3} style={{ fill: 'orange' }} />
        <StyledText
          x={left}
          y={top}
          textAnchor="start"
          dominantBaseline="text-after-edge"
        >
         
        </StyledText>
        <StyledText
        
          textAnchor="end"
          dominantBaseline="text-before-edge"
        >
        
        </StyledText>
      </React.Fragment>
    );
  }

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


const Dashboard = () => {
    // drop down
    const [time, setTime] = React.useState('1');

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    const [main, setmain] = useState(true);
    const [tables, setTables] = useState(false);
    // click on particualar request box
    const ClickRequest = () => {
        setmain(false);
        setTables(true);
    }

    // finish viewing the details 
    const FinishViewing = () => {
        setTables(false);
        setmain(true);
    }

    return (

        <div className="home-container" style={{ marginTop: '4%'}}>
            <div className="top">
                <div className="top-line">
                    <p>Medi Care Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">18 June 2023</p>
                </div>
                <div className="top-line">
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>DashBoard</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>


            <div className="boarding-wrapper-main" style={{ width:'1500px'}}>
                <div className="boarding-wrapper" style={{ backgroundColor: '#3d3b3b', height: '250px' ,width:'1000px'}}>
                    <div className="boarding-box-header">
                        <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'white' }} />
                        <h3 style={{ color :'white'}}>Appointments Analyze</h3>
                        <Box sx={{ minWidth: 120, marginLeft: '315px' }}>
                            <FormControl fullWidth>
                               
                            </FormControl>
                        </Box>
                    </div>

                    <div className="boarding-wrapper-box-mian">
                        <div className="boarding-wrapper-box" style={{ backgroundColor: 'orange' ,width:'900px'}}>
                            <p style={{ fontWeight: 'bold' , marginLeft: '5px',color:'white' }}>&nbsp;&nbsp;<PetsIcon sx={{ color: 'white', marginRight: '5px' }} /> Total Appointments</p>
                            <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'white' }}>10</h1>
                        </div>
                        <div className="boarding-wrapper-box" style={{ backgroundColor: 'white' }} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Completed Appointments</p>
                            <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>07</h1>
                        </div>
                        <div className="boarding-wrapper-box" style={{ backgroundColor: 'white' }} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Pending Appointments</p>
                            <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>03</h1>
                        </div>
                        <div className="boarding-wrapper-box" style={{ backgroundColor: 'white' }} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Accepted Appointments</p>
                            <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>00</h1>
                        </div>
                    </div>
                </div>

                 <div className="boarding-wrapper" style={{ backgroundColor: '#3d3b3b', height: '250px',width:'400px' }}>
                    <div className="boarding-box-header">
                         <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'white' }} />
                         <h3 style={{ fontWeight: 'normal', marginBottom: '0' ,color:'white'}}>Doctors</h3>
    <h3 style={{ fontWeight: 'normal', marginTop: '0',color:'white' }}>Analyze</h3>
                        <Box sx={{ minWidth: 500, marginLeft: '215px' }}>
                            <FormControl fullWidth>
                               
                            </FormControl>
                        </Box>
                    </div>
                    <div className="boarding-wrapper-box-mian"style={{ display: 'flex', flexDirection: 'column' }}>
  <div className="boarding-wrapper-box" style={{ backgroundColor: 'white', width: '350px', height: '50px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
    <p style={{ fontWeight: 'bold', marginLeft: '5px', color: 'black', position: 'relative', top: '-15px' }}>&nbsp;&nbsp;<PetsIcon sx={{ color: 'orange', marginRight: '5px' }} /> Total Doctors<h1 style={{ fontWeight: '1000', textAlign: 'right', fontSize: '20px', color: 'orange', position: 'relative', top: '-35px' }}>10</h1></p>
  </div>
  
  <div className="boarding-wrapper-box" style={{ backgroundColor: 'white', width: '350px', height: '50px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
    <p style={{ fontWeight: 'bold', marginLeft: '5px', color: 'black', position: 'relative', top: '-15px' }}>&nbsp;&nbsp;<PetsIcon sx={{ color: 'orange', marginRight: '5px' }} /> Available Doctors<h1 style={{ fontWeight: '1000', textAlign: 'right', fontSize: '20px', color: 'orange', position: 'relative', top: '-35px' }}>8</h1></p>
  </div>
</div>

                    </div> 
                    {/* {main && (
                        <div>
                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment  ID : 1 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>

                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment ID : 2 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div> */}

                            {/* <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment ID : 3 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>
                        </div>
                    )} */}



                 {/* </div> */}
            </div> 

            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper" style={{ backgroundColor: 'orange', height: '300px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AssignmentLateIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                        <h3>Pending Appointments</h3>
                        </div>
                        {main && (
                        <div>
                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment  ID : 1 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>

                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment ID : 2 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>
                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment ID : 3 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>
                    

</div>
)}
      {tables && (
                <div style={{ padding: '20px', margin: '20px', borderRadius: '10px', backgroundColor: '#f0f0f5' }}>
                    <p>Appointment ID : 1 </p>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fe9e0d', color: 'blue' }}>
                            <StyledTableRow>
                                <StyledTableCell align="center">Client ID</StyledTableCell>
                                <StyledTableCell align="center">Pet ID</StyledTableCell>
                                <StyledTableCell align="center">Doctor ID</StyledTableCell>
                                <StyledTableCell align="center">Appointment Date</StyledTableCell>
                                <StyledTableCell align="center">Appointment Time</StyledTableCell>
                            </StyledTableRow>
                        </TableHead >
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align="center">01</StyledTableCell>
                                <StyledTableCell align="center">04</StyledTableCell>
                                <StyledTableCell align="center">05</StyledTableCell>
                                <StyledTableCell align="center">20/07/2023</StyledTableCell>
                                <StyledTableCell align="center">10:00:00</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>

                    <Button onClick={() => FinishViewing()} sx={{ backgroundColor: 'orange', color: 'white', width: '100px', marginTop: '10px', marginLeft: '80%',  ':hover': {
      backgroundColor: 'orange',
    } }}>Done</Button>

                </div>
            )}               {/* <div>
                        <BarChart
                            colors={['black']}
                            sx={{ marginBottom: '3%', backgroundColor: '#f0f0f5' }}
                            xAxis={[
                                {
                                    id: 'barCategories',
                                    data: ['Cats', 'Dogs'],

                                    scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                    data: [5, 10],
                                },
                            ]}

                            width={600}
                            height={250}
                        />
                    </div>
 */}

                </div>

                <div className="boarding-wrapper" style={{ backgroundColor: '#F0F0F5', height: '310px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <InventoryIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ fontWeight: 'normal', marginBottom: '50' ,color:'black'}}>Daily</h3>
    <h3 style={{ fontWeight: 'normal', marginTop: '0',color:'black' }}>Appointment</h3>
    <h3 style={{ fontWeight: 'normal', marginTop: '0',color:'black' }}>Analyze</h3>
                        </div>

                        <Box sx={{ minWidth: 120, marginLeft: '400px' }}>
                            <FormControl fullWidth>
                               
                            </FormControl>
                        </Box>
                    </div>
                    <div>

                    <ResponsiveChartContainer
  margin={{ top: 20, left: 10, right: 10, bottom: 30 }}
  height={250}
  series={[
    {
      type: 'line',
      data: [13, 13, 54, 651, 657, 987, 64, 654, 954, 654, 897, 84],
    },
  ]}
  xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
>

      <LinePlot className="custom-chart-line" /> {/* Set the line chart color to orange */}
  <DrawingAreaBox />
</ResponsiveChartContainer>
<div className="x-axis-labels">
    <span>Days</span>
   
  </div>

  <div className="y-axis-labels">
    <span>Appointments</span>
  </div>
                    </div>
                </div>
            </div>

            {/* view details of pending boarding requests (after click on) */}
           




        </div>
    )
}

export default Dashboard
