import React from "react";
import "./css/Sidebar.css";
import { NavLink } from "react-router-dom";

import {
  faHome,
  faSearch,
  faBroadcastTower,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  return (
    <div className="container">
      <section className="sidebar-topics">
        <NavLink exact to="/" className="item" activeClassName="active">
          <span>Home</span>
        </NavLink>
        
        <NavLink exact to="/profile" className="item" activeClassName="active">
          <span>Profile</span>
        </NavLink>
{/* 
        <NavLink exact to="/discover" className="item" activeClassName="active">
          <span>Discover</span>
        </NavLink>

        <NavLink exact to="/radio" className="item" activeClassName="active">
          <span>Radio</span>
        </NavLink>

        <NavLink exact to="/foryou" className="item" activeClassName="active">
          <span>For you</span>
        </NavLink> */}
      </section>

      {/* your library */}
      <section className="sidebar-library">
        <h4>Your Library</h4>
        <NavLink exact to="/likes" className="item" activeClassName="active">
          {/* <FontAwesomeIcon className="icon" icon={faRecordVinyl} /> */}
          <span>Liked Songs</span>
        </NavLink>
        
        <NavLink exact to="/recently-played" className="item" activeClassName="active">
          {/* <FontAwesomeIcon className="icon" icon={faRecordVinyl} /> */}
          <span>Recently Played</span>
        </NavLink>
        
        <NavLink exact to="/artists" className="item" activeClassName="active">
          {/* <FontAwesomeIcon className="icon" icon={faUser} /> */}
          <span>Artists</span>
        </NavLink>

        <NavLink exact to="/top" className="item" activeClassName="active">
          {/* <FontAwesomeIcon className="icon" icon={faRecordVinyl} /> */}
          <span>Top Songs</span>
        </NavLink>

        <NavLink exact to="/playlists" className="item" activeClassName="active">
          {/* <FontAwesomeIcon className="icon" icon={faMusic} /> */}
          <span>Playlists</span>
        </NavLink>
        
        <NavLink exact to="/discover" className="item" activeClassName="active">
          <FontAwesomeIcon className="icon" icon={faSearch} />
          <span>Discover</span>
        </NavLink>
        
        <NavLink exact to="/search" className="item" activeClassName="active">
          {/* <FontAwesomeIcon className="icon" icon={faMusic} /> */}
          <span>Search</span>
        </NavLink>
      </section>

      {/* Footer on mobile */}
      <section className="sidebar-mobile">
        <NavLink exact to="/" className="item" activeClassName="active">
          <FontAwesomeIcon className="icon" icon={faHome} />
          <span>Home</span>
        </NavLink>

        <NavLink exact to="/discover" className="item" activeClassName="active">
          <FontAwesomeIcon className="icon" icon={faSearch} />
          <span>Discover</span>
        </NavLink>

        <NavLink
          exact
          to="/favorites"
          className="item"
          activeClassName="active"
        >
          <FontAwesomeIcon className="icon" icon={faHeart} />
          <span>Favorites</span>
        </NavLink>

        <NavLink exact to="/radio" className="item" activeClassName="active">
          <FontAwesomeIcon className="icon" icon={faBroadcastTower} />
          <span>Radio</span>
        </NavLink>
      </section>
    </div>
  );
};

export default Sidebar;