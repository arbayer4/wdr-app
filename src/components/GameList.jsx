import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState} from "react";
import API from "../services/api-config";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import IconButton from '@mui/material/IconButton';
import "./GameList.css"
import { Card } from "@mui/material";
import { Chip } from '@mui/material';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import { id } from "date-fns/locale";

function GameList(props) {
  
  const [expand, setExpand] = useState(false);
  const dateOptions ={weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit'}

 

  const  handleAddUser = async (gameId) => {
    try {
      const resp = await API.post('/add-player-to-game',
      {
        game_id: gameId,
        player_id: props.user.id
      },
      {withCredentials: true})
      props.setGames(props.games.map((game)=> {
        if(game.id === gameId){
          const update = {...game, players: [...game["players"], resp.data.player]}
          return update
        } else{
          return game
        }
      }))
    }catch (error) {
      console.error("Get games error",error);
    } 
  }
  const handleRemoveUser = async (gameId) =>{
    try {
      const resp = await API.post('/remove-player-from-game',
      {
        game_id: gameId,
        player_id: props.user.id
      },
      {withCredentials: true})
      props.setGames(props.games.map((game)=> {
        if(game.id === gameId){
          const update = {...game, players: game["players"].filter(player=>player.id!==resp.data.player_id)}
          return update
        } else{
          return game
        }
      }))
    }catch (error) {
      console.error("Get games error",error);
    } 
  }

  const handleExpand = (index) => {
    if (index === expand) {
      setExpand(false)
    } else {
      setExpand(index)
    }
  }
  return (
    <div>
      <Card variant="outlined" sx={{padding: "25px 40px", margin: "20px", width: "60vw"}}>
      <Typography gutterBottom variant="h5" component="div">
          Scheduled Games
        </Typography>
      {props.games.map((game, index)=>(
        <Accordion key ={index} expanded = {expand === index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick = {()=>handleExpand(index)}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordian-summary-container">
            <div className="as-left">
              <Typography>{new Date(game.date).toLocaleString("en-US", dateOptions)}</Typography>
            </div>
            <div className="as-center">
            <Typography sx= {{color: "gray"}}><span style={game.players?.length > 15 ? {color: "red"}: null}>{`${game.players?.length}`}</span>/15 spots filled</Typography>

            </div>
            <div className="as-right">
              
              {game?.players?.some(player=>player.id===props.user?.id) ? (<IconButton aria-label="remove" color = "error" onClick={()=>handleRemoveUser(game.id)}>
                <RemoveCircleTwoToneIcon/>
              </IconButton>)
              :(<IconButton aria-label="add" color = "primary" onClick={()=>handleAddUser(game.id)}>
              <AddCircleOutlineTwoToneIcon />
            </IconButton>)}
              
              
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="player-list">
            {game.players.map((player, index) =>(
              <li style ={player.id===props.user.id ?{color:"green", fontWeight: "bold"}: null} key={index}>{`${index + 1}. ${player.firstname} ${player.lastname}  `}
               {index >= 15 && <Chip label="Waitlisted" color="error" variant="outlined" /> }
               </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      ))}
       
       </Card>
    </div>
  );
}

export default GameList;