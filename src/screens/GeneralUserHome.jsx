import { useState, useEffect } from "react";
import GameList from "../components/GameList";
import API from "../services/api-config";
import "./AdminPanel.css"

function GeneralUserHome(props) {
  const [games, setGames] = useState([]);

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
    getGames()
  },[])


  return (
    <div className ="general-container">
      <GameList user={props.user} games = {games} setGames={setGames}/>
    </div>
  );
}

export default GeneralUserHome;