import React from "react";
import "../css/MusicBot.css";
import { NavLink } from "react-router-dom";

import {
  faHome,
  faSearch,
  faBroadcastTower,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MusicBot() {

  return (
    <div className="musicbot-container">
      <section className="musicbot-topics">

      </section>

      <section className="musicbot-library">
        <h4 style={{color: "white",marginLeft: "20px"}}>Music Bot</h4>
 
      </section>

    </div>
  );
}

export default MusicBot;
