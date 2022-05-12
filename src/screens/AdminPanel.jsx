import { useState, useEffect } from "react";
import GameDatePicker from "../components/GameDatePicker";
import GameList from "../components/GameList";
import InvitePlayers from "../components/InvitePlayers";
import VerifyPlayers from "../components/VerifyPlayers";
import API from "../services/api-config";
import "./AdminPanel.css"

function AdminPanel(props) {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(()=>{
    const getGames = async () => {
      try {
        const resp = await API.get('/games')
        console.log(resp);
        setGames(resp.data)
      }catch (error) {
        console.error("Get games error",error);
      }
    }
    const getPlayers = async () => {
      try {
        const resp = await API.get('/users')
        console.log(resp);
        setPlayers(resp.data.users)
      }catch (error) {
        console.error("Get games error",error);
      }
    }
    getGames()
    getPlayers()
  },[])


  const handleSaveGames = async (selectedDates) => {
    console.log("saving games")
    await API.post("/games",
    {
      games: selectedDates
    }
    ).then(response => {
      console.log(response.data.games_created)
      setGames([...games, ...response.data.games_created])
      return
    })
  }

  return (
    <div className ="admin-container">
      <GameList user={props.user} games = {games} setGames={setGames}/>
      <GameDatePicker handleSaveGames = {handleSaveGames}/>
      <InvitePlayers/>
      <VerifyPlayers players = {players} setPlayers = {setPlayers}/>
    </div>
  );
}

export default AdminPanel;