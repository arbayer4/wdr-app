import React from 'react';
import GameDatePicker from "../components/GameDatePicker";
import GameList from "../components/GameList";
import "./AdminPanel.css"

function AdminPanel(props) {
  return (
    <div className ="admin-container">
      <GameList user={props.user}/>
      <GameDatePicker/>
    </div>
  );
}

export default AdminPanel;