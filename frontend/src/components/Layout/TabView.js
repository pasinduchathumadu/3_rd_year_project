import * as React from 'react';
import Box from '@mui/material/Box';
import {Tabs, Tab,Typography} from '@mui/material';
import TabPanel from '../TabPanel';

import '../../styles/Care_center_manager/Packages.css';
import dog from '../../assests/dog_bath.jpg';
import groom from '../../assests/dog_groom.jpg';
import trim from '../../assests/dog_trim.jpg';

export default function TabView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', Typography: 'body1' }}>
      <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="Tab Component"
            indicatorColor='transparent'
            sx={{ borderRadius: '10px' }}

          >
            <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="dogs" />
            <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="cats" />
          </Tabs>
          {value === 0 && 
          <TabPanel> </TabPanel>}
          {value === 1 && <TabPanel></TabPanel>}
    </Box>
  );
}