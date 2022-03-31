import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from "react";
import API from "../services/api-config";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import IconButton from '@mui/material/IconButton';
import "./GameList.css"
import { Card } from "@mui/material";
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import { id } from "date-fns/locale";

function GameList(props) {
  const [games, setGames] = useState([]);
  const [expand, setExpand] = useState(false);
  const dateOptions ={weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit'}

  useEffect(()=>{
    const getGames = async () => {
      try {
        const resp = await API.get('/games', {withCredentials: true})
        console.log(resp);
        setGames(resp.data)
      }catch (error) {
        console.error("Get games error",error);
      }
    }
    getGames()
  },[])

  const  handleAddUser = async (gameId) => {
    try {
      const resp = await API.post('/add-player-to-game',
      {
        game_id: gameId,
        player_id: props.user.id
      },
      {withCredentials: true})
      setGames(games.map((game)=> {
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
      setGames(games.map((game)=> {
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
      {games.map((game, index)=>(
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
            <div className="as-right">
              <Typography>{`${game.players?.length}/15`}</Typography>
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
          <ul>
            {game.players.map(player =>(
              <li>{`${player.order}. ${player.firstname} ${player.lastname}`}</li>
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