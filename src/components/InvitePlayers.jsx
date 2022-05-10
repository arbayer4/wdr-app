import {useState} from 'react';import { Card } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import API from "../services/api-config";

function InvitePlayers(props) {
  const [formData, setFormData] = useState({
    invitedUsers: ""
  })

  const handleInviteUsers = async (e) => {
    e.preventDefault()
    console.log("Inviting Users")
    console.log(formData.invitedUsers)
    await API.post("/invites",
    {
      invites: formData.invitedUsers
    },
    {withCredentials: true}
    ).then(response => {
      console.log(response.data)
      setFormData({invitedUsers: ""})
      return
    })
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div>
    <Card component="form" onSubmit={handleInviteUsers} variant="outlined" sx={{minWidth: "40vw", padding: "25px", margin: "30px"}}>
    <CardContent sx={{minWidth:"200px"}}>
    <Typography gutterBottom variant="h5" component="div">
        Invite Players
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Enter emails seperated by commas
        </Typography>
        <TextField
        sx={{width: "90%"}}
          id="outlined-multiline-static"
          label="Player Emails"
          multiline
          rows={10}
          name="invitedUsers"
          onChange={handleChange}
          value={formData.invitedUsers}
          placeholder= "example1@gmail.com, example2@gmail.com"
        />
      

    </CardContent>
    <CardActions>
      <Button size="small" type="submit">Invite Players</Button>
    </CardActions>
    </Card>
    </div>
  );
}

export default InvitePlayers;