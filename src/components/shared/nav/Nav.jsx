import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import "./Nav.css"

function Nav(props) {
  return (
    <nav className="nav-container">
      {props.user ? <Tooltip title="Settings">
      <IconButton>
        <SettingsIcon fontSize='large'/>
      </IconButton>
    </Tooltip>:<div></div>}
      <Link to ="/" className="nav-title">WDR</Link>
      {props.user ? <Tooltip title="Logout">
      <IconButton onClick={props.logout}>
        <LogoutIcon fontSize='large'/>
      </IconButton>
    </Tooltip>:<div></div>}

    </nav>
  );
}

export default Nav;

