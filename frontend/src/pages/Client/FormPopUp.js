import React, { useEffect, useState } from "react";
import { Button, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
const Add_Competition_Form = () => {
    const [compDes, setDescription] = useState("");
    const [compFile, setFile] = useState("");
    const [selectedDate,setdate] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        console.log(compDes, compFile);
    }
   const handleDateChange = (newvalue)=>{
    setdate(newvalue)
   }

   console.log(selectedDate)

    const [age, setAge] = React.useState('');
   const [package1,setpackage] = useState([])
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const get_package = async()=>{
        const res = await axios.get('http://localhost:5000/pet_care/user/get_allpackages')
        const data = await res.data
        return data
      
      }

      const submit = async(id)=>{
        try{
            const res = await axios.post('http://localhost:5000/pet_care/user/edit_appointment',{
                id,
                selectedDate
            })

        }catch(err){
            console.log(err)
        }
      }

      useEffect(()=>{
        get_package()
        .then((data)=>setpackage(data.data))
        .catch((err)=>console.log(err))
      })
    

    return (
        <>
            <form onSubmit={handleSubmit} action={"#"} >
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Changed Date" value={selectedDate} onChange={handleDateChange} />
                    </DemoContainer>
                </LocalizationProvider>
                <Box sx={{ minWidth: 120 }} mt={3}>
             
                  
                           <FormControl fullWidth>
                       
                         <><InputLabel id="demo-simple-select-label">Package Name</InputLabel><Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Package Name"
                            onChange={handleChange}

                        >
                             {package1 && package1.map((menu,index)=>
                            <MenuItem value={menu.package_id}> {menu.package_name}</MenuItem>)}
                        </Select></>
                        </FormControl>
                   

              
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
              
                    <Button onClick={()=>submit(age)} variant="outlined" color="secondary" type="submit">
                        Submit
                    </Button>
              
                </Box>

            </form>
        </>
    );
};

export default Add_Competition_Form;