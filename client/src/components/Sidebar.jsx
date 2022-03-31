import React from "react";
import "../css/Sidebar.css";
import { NavLink } from "react-router-dom";

import {
  faHome,
  faSearch,
  faBroadcastTower,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({ accessToken }) {
  return (
    <div className="sidebar-container">
      <section className="sidebar-topics">
        <NavLink
          // key={"myRoute"}
          to="/"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
        >
          <span>Home</span>
        </NavLink>

        <NavLink exact to="/profile" className="item" activeClassName="active">
          <span>Profile</span>
        </NavLink>
      </section>

      {/* your library */}
      <section className="sidebar-library">
        <h4>Your Library</h4>
        <NavLink
          // key={"myRoute"}
          to="/likes"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
        >
          {" "}
          {/* <FontAwesomeIcon className="icon" icon={faRecordVinyl} /> */}
          <span>Liked Songs</span>
        </NavLink>

        {/* <NavLink
          exact
          to="/recently-played"
          className="item"
          activeClassName="active"
        >
          <span>Recently Played</span>
        </NavLink> */}

        <NavLink
          to="/artists"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
        >         
        <span>Top Artists</span>
        </NavLink>

        <NavLink
          // key={"myRoute"}
          to="/top"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
        >
          {/* <FontAwesomeIcon className="icon" icon={faRecordVinyl} /> */}
          <span>Top Songs</span>
        </NavLink>

        <NavLink
          exact
          to="/playlists"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
        >
          {/* <FontAwesomeIcon className="icon" icon={faMusic} /> */}
          <span>Playlists</span>
        </NavLink>

        {/* <NavLink exact to="/discover" className="item" activeClassName="active">
          <span>Discover</span>
        </NavLink>

        <NavLink exact to="/search" className="item" activeClassName="active">
          <FontAwesomeIcon className="icon" icon={faSearch} />
          <span>Search</span>
        </NavLink> */}
        
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
}

export default Sidebar;
