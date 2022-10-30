import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';

import { TextField, InputLabel, Slider, MenuItem, Select } from '@mui/material';
const AddModel = (props) => {
  const [perc, setPerc] = useState(20);
  const [name, setName] = useState("");
  const [type, setType] = useState("publisher");
  const [address, setAddress] = useState("");


  const marks = [
    {
      value: 10,
      label: '10%',
    },{
        value: 20,
        label: '20%',
      },{
        value: 30,
        label: '30%',
      },{
        value: 40,
        label: '40%',
      },{
        value: 50,
        label: '50%',
      },{
        value: 60,
        label: '60%',
      },{
        value: 70,
        label: '70%',
      },{
        value: 80,
        label: '80%',
      },{
        value: 90,
        label: '90%',
      },{
        value: 100,
        label: '100%',
      },
    
  ];
  
  function valuetext(value) {
    return `${value}%`;
  }
  return (
    <div>
      <Box
        sx={{
          minWidth: 500,
          bgcolor: 'white',
          borderRadius: 1,
          boxShadow: 2,
          p: 3,
        }}
      >
        <Typography variant="h6" marginBottom={2.25}>
          Adding split for {props.data.name}
        </Typography>
       
        

        <Box>
                <InputLabel htmlFor="uncontrolled-native">Name</InputLabel>
                <TextField
                  value={name}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                  onChange={(event) => setName(event.target.value)}
                  fullWidth
                />
                <InputLabel htmlFor="uncontrolled-native">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                >
                    <MenuItem value={"publisher"}>Publisher</MenuItem>
                    <MenuItem value={"label"}>Label</MenuItem>
                    <MenuItem value={"creator"}>Creator</MenuItem>
                </Select>
                <InputLabel htmlFor="uncontrolled-native">Split precentage</InputLabel>
                <Slider
                    aria-label="Always visible"
                    defaultValue={10}
                    getAriaValueText={valuetext}
                    step={10}
                    marks={marks}
                    valueLabelDisplay="on"
                    value={perc}
                    
                  onChange={(event) => setPerc(event.target.value)}
                />
              </Box>
        
        <Box sx={{ mb: 5 }}>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', m: -1.25 }}>
            <Checkbox id="2523" onClick={toggleApproved} checked={approved} />
            <label htmlFor="2523">
              <Typography fontWeight={500}>I understand and continue</Typography>
            </label>
          </Box> */}
        </Box>
        <Button size="large" fullWidth onClick={() => props.callback(props.data, {
            id: name,
            name: name,
            type:"entity",
            subType: type,
            perc: perc + "%"
        })}>
          Add split
        </Button>
      </Box>
     
    </div>
  );
}
export default AddModel