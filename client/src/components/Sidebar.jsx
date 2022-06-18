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

function Sidebar({view,setAccordionOpened,listener, setSearch, setSearchResults, setView,showPlayer, accessToken }) {

// const navLinkStyles =({isActive}) => {
//   return{
//     fontWeight: isActive ? 'bold' : 'normal',
//     display: "block",
//     color: "rgb(255, 255, 255)",
//     textDecoration: "none",
//     margin: "20px 0",
//     font: "18px"
//   }
// }

function handleLike(){
  showPlayer(false);
  setView("likes");
}

function handleRec(){
  showPlayer(false);
  setView("rec");
}

function handleArtists(){
  showPlayer(false);
  setView("artists");
}

function handleTracks(){
  showPlayer(false);
  setView("topSongs");

}

function handlePlaylists(){
  showPlayer(false);
  setView("playlists");

}

function resetAll(){
  showPlayer(false);
  setView("");
  setSearchResults([]);
  setSearch("");

}

  return (
    <div className="sidebar-container">
      <section className="sidebar-topics">
        <NavLink
          // key={"myRoute"}
          to="/"
          state={{ accessToken: accessToken}} // view: `${""}` 
          className="item"
          activeClassName="active"
          onClick={resetAll} 
        >
          <span>Home</span>
        </NavLink>

        {/* <NavLink exact to="/profile" className="item" activeClassName="active">
          <span>Profile</span>
        </NavLink> */}
      </section>

      {/* your library */}
      <section className="sidebar-library">
        <h4>Your Library</h4>
        <NavLink
          // key={"myRoute"}
          to="/" // "/likes"
          state={{ accessToken: accessToken }} //view: `${"likes"}`
          className="item"
          activeClassName="active"
          onClick={handleLike}
          //style={navLinkStyles}
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
          to="/"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
          onClick={handleArtists} 
          //style={navLinkStyles}

        >         
        <span>Top Artists</span>
        </NavLink>

        <NavLink
          // key={"myRoute"}
          to="/"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
          onClick={handleTracks} 

        >
          {/* <FontAwesomeIcon className="icon" icon={faRecordVinyl} /> */}
          <span>Most Played Songs</span>
        </NavLink>
        
        <NavLink
          to="/"
          state={{ accessToken: accessToken}}
          className="item"
          activeClassName="active"
          onClick={handlePlaylists} 
        >
          <span>Playlists</span>
        </NavLink>
        
        {listener==="passive" &&
        <div>
        

        
        <NavLink
          exact
          to="/"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
          onClick={handleRec} 
        >         
        <span>Discover</span>
        </NavLink>
        
        <NavLink exact to="/" className="item" activeClassName="active" onClick={()=> setView("search")} >
          {/* <FontAwesomeIcon className="icon" icon={faSearch} /> */}
          <span>Search</span>
        </NavLink>
        </div>
      }
      
      </section>

      <section className="sidebar-library">
        <NavLink
          to="/"
          className="item"
          activeClassName="active"
          onClick={resetAll} 
        >
          <span>Log out</span>
        </NavLink>

      </section>
      
      {/* Footer on mobile */}
      <section className="sidebar-mobile">
        <NavLink      
          to="/"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
          onClick={resetAll} >
          <FontAwesomeIcon className="icon" icon={faHome} />
          <span>Home</span>
        </NavLink>
        
        <NavLink
          to="/" 
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
          onClick={handleLike} 
        >
          <FontAwesomeIcon className="icon" icon={faHeart} />
          <span>Likes</span>
        </NavLink>
        
        <NavLink           
          to="/"
          state={{ accessToken: accessToken}}
          className="item"
          activeClassName="active"
          onClick={handlePlaylists} >
          <FontAwesomeIcon className="icon" icon={faBroadcastTower} />
          <span>Playlists</span>
        </NavLink>
        
        <NavLink           
          exact
          to="/"
          state={{ accessToken: accessToken }}
          className="item"
          activeClassName="active"
          onClick={handleRec} >
          <FontAwesomeIcon className="icon" icon={faSearch} />
          <span>Discover</span>
        </NavLink>

      </section>
    </div>
  );
}

export default Sidebar;
