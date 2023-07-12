import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import ErrorIcon from '@mui/icons-material/Error';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Grid } from '@mui/material';

export default function SizesList() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'left',
        gap: 6,
        flexWrap: 'wrap',
        '& > *': { minWidth: 0, flexBasis: 200 },
      }}
    >
      
      <Box key="lg">
  <Typography level="body3" mb={2}>
  </Typography>
  <List
    size="lg"
    variant="outlined"
    sx={{
    //   borderRadius: 'sm',
      maxWidth: 300,
    //   height:720,
      height:'100vh',
      boxShadow: 'sm',    
      bgcolor:'black',
      gap: 6,
     
    }}
  >
    <ListItem
    sx={{
        borderRadius:'10px',
        '&:hover': {
            backgroundColor: 'red',
            borderColor:'green',
        }
    }}
    >
      <ListItemButton>
        <ListItemDecorator>
          <Home sx={{color:'white'}} />
        </ListItemDecorator> 
        <Grid sx={{color:'white'}}>Dashboard</Grid>
      </ListItemButton>
    </ListItem>
    
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <Person sx={{color:'white'}} />
        </ListItemDecorator>
        <Grid sx={{color:'white'}}>Clients</Grid>
      </ListItemButton>

    </ListItem>
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <PetsIcon sx={{color:'white'}} />
        </ListItemDecorator>
        <Grid sx={{color:'white'}}>Board Pets</Grid>
      </ListItemButton>
    </ListItem>

    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <FactCheckIcon sx={{color:'white'}} />
        </ListItemDecorator>
        <Grid sx={{color:'white'}}>Packages</Grid>
      </ListItemButton>
    </ListItem>

   
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <ErrorIcon sx={{color:'white'}} />
        </ListItemDecorator>
        <Grid sx={{color:'white'}}>Complains</Grid>
      </ListItemButton>
    </ListItem>

  </List>
</Box>

    </Box>
  );
}