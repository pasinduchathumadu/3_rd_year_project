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

// import { Grid } from 'react-grid-library';


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
      borderRadius: 'sm',
      maxWidth: 300,
      height:'100vh',
      boxShadow: 'sm',
      bgcolor: 'black',
      gap: 6
    }}
  >
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <Home />
        </ListItemDecorator>
        <Grid sx={{ 
          color:'white',
          fontWeight:'bold'

        }}>Dashboard</Grid>
      </ListItemButton>
    </ListItem>
    
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <Person />
        </ListItemDecorator>
        <Grid sx={{ 
          color:'white',
          fontWeight:'bold'

       }}>Clients</Grid>
      </ListItemButton>

    </ListItem>
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <PetsIcon />
        </ListItemDecorator>
        <Grid sx={{ 
          color:'white',
          fontWeight:'bold'

       }}>Board Pets</Grid>
      </ListItemButton>
    </ListItem>

    <ListItem>
      <ListItemButton sx={{
        '&:hover': {
          color:'black'
        }
      }}>
        <ListItemDecorator>
          <FactCheckIcon />
        </ListItemDecorator>
        <Grid sx={{ 
          color:'white',
          fontWeight:'bold'
        }}>Packages</Grid>
      </ListItemButton>
    </ListItem>

   
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <ErrorIcon />
        </ListItemDecorator>
        <Grid sx={{ 
          color:'white',
          fontWeight:'bold'

        }}>Complains</Grid>
      </ListItemButton>
    </ListItem>

  </List>
</Box>

    </Box>
  );
}