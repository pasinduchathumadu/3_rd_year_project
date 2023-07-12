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
      height:720,
      boxShadow: 'sm',
      bgcolor: 'background.body',
      gap: 6
    }}
  >
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <Home />
        </ListItemDecorator>
        Dashboard
      </ListItemButton>
    </ListItem>
    
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <Person />
        </ListItemDecorator>
        Clients
      </ListItemButton>

    </ListItem>
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <PetsIcon />
        </ListItemDecorator>
        Board Pets
      </ListItemButton>
    </ListItem>

    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <FactCheckIcon />
        </ListItemDecorator>
        Packages
      </ListItemButton>
    </ListItem>

   
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <ErrorIcon />
        </ListItemDecorator>
        Complains
      </ListItemButton>
    </ListItem>

  </List>
</Box>

    </Box>
  );
}