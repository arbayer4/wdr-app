// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from "@mui/lab/MobileDateTimePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from 'react';
import { Card } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import API from "../services/api-config";

function GameDatePicker(props) {
  const [dateValue, setDateValue] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  // const [loading, setLoading] = useState(false)
  const dateOptions ={year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}

  const handleDateSelect = ()=>{
    let dupe=false
    selectedDates.forEach((date)=>{
      if(date.getTime()===dateValue.getTime()){
        dupe = true
      }
    })
    if (!dupe){
      let sortedDates = [...selectedDates, dateValue].sort((a,b)=>a-b)
      setSelectedDates(sortedDates)
      return;
    } 
    
  }
  const removeDate = (index) =>{
    setSelectedDates(selectedDates.filter((_, i) => i !== index))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    await props.handleSaveGames(selectedDates).then((response)=>
    setSelectedDates([])
    )
  
  }

  return (
    <div>
      
    <Card component="form" onSubmit={handleSave} variant="outlined" sx={{padding: "25px", margin: "10px"}}>
      <CardContent sx={{minWidth:"200px"}}>
      <Typography gutterBottom variant="h5" component="div">
          Add Games
        </Typography>
      <DatePicker
          selected={dateValue}
          onCalendarClose={handleDateSelect} 
          onChange={(date) => setDateValue(date)}
          showTimeSelect 
        />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date Picker"
          value={dateValue}
          onChange={(newValue) => {
            setDateValue(newValue);
          }}
          views={['day']}
          renderInput={(params) => <TextField {...params} helperText={null}  />}
        />
        </LocalizationProvider> */}
        
        <div>
        <List sx={{ width: '100%'}}>
          {selectedDates?.map((date, i)=>(
            <ListItem
            key={i}
            secondaryAction={
              <IconButton onClick={()=>removeDate(i)}>
                <RemoveCircleIcon />
              </IconButton>
            }
            disablePadding
          >
              <ListItemText primary={date?.toLocaleString("en-US", dateOptions)} />
          </ListItem>
          ))}
        </List>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" type="submit">Save Games</Button>
      </CardActions>
      </Card>
      </div>
  );
}

export default GameDatePicker;