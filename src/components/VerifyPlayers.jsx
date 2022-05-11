
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';import API from "../services/api-config";

function VerifyPlayers(props) {

  const handleVerifyUser = async (userId) => {
    try {
      const resp = await API.post('/user-verify',
      {
        user_id: userId
      },
      {withCredentials: false})
      props.setPlayers(props.players.map((player)=>{
        return player.id === resp.data?.user_verified?.id ? resp.data.user_verified : player
      }))
    }catch (error) {
      console.error("Get games error",error);
    } 
  }

  
  return (
    <Card component="form"  variant="outlined" sx={{minWidth: "40vw", padding: "25px", margin: "30px"}}>
    <CardContent sx={{minWidth:"200px"}}>
    <Typography gutterBottom variant="h5" component="div">
        Players Awaiting Verification
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
          These players have signed up and are awaiting aprroval
        </Typography>
        <List>
          {props.players?.filter(player=> !player.verified).length ? props.players?.filter(player=> !player.verified).map((player)=>(
            
            <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="approve" color="success" onClick={()=>handleVerifyUser(player.id)}>
                <CheckCircleOutlineIcon  />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${player.firstname} ${player.lastname}: ${player.email}`}
              
            />
          </ListItem>
          )) : (<h3>All caught up</h3>)}
      </List>
    </CardContent>
    </Card>
  );
}

export default VerifyPlayers;