import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "../css/Login.css";
import { useNavigate } from 'react-router-dom';

import { Modal } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=f6f8e70042bb47cd9c82ef26e1cb83a7&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-read-private%20playlist-read-collaborative%20streaming%20user-read-email%20playlist-modify-private%20playlist-modify-public";

// const code = new URLSearchParams(window.location.search).get("code");

export default function Login(props) {
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();

  return (
    <div className="music">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* <h1> Music for every mood.</h1> */}

        <Button className="btn btn-success btn-lg" href={AUTH_URL}>
            Get Started
        </Button>
        
        
        {/* {!showModal &&
        <Button
          backdrop="static"
          size="lg"
          variant="success"
          onClick={() => {
            setShowModal(true);
          }}
        >
          GET STARTED
        </Button>
        }
        
        {showModal &&
        <Modal
          show={showModal}
          size="lg"
          onHide={() => setShowModal(false)}
          
          aria-labelledby="contained-modal-title-vcenter"
          centered
          // className="special_modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Welcome to Spotify 2.0</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Be honest, are you here because you're procrastinating doing something?
          </Modal.Body>
          
          <Modal.Footer>
          <Button href={AUTH_URL} variant="primary" onClick={()=> {
              props.setListener("active");
              props.setDash(true);
              }}>
              No, just here to listen
          </Button>
          <Button href={AUTH_URL} variant="danger" onClick={()=> {
            props.setListener("passive");
            props.setDash(true);}}>
            Guilty
          </Button>
        </Modal.Footer>
          
        </Modal>
      } */}

      </Container>
    </div>
  );
}

// import React, { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// export const authEndpoint = 'https://accounts.spotify.com/authorize';
// const clientId = "f6f8e70042bb47cd9c82ef26e1cb83a7";
// const redirectUri = "http://localhost:3000/";
// const scopes = [
//   "user-read-currently-playing",
//   "user-read-playback-state",
//   "streaming",
//   "user-read-email",
//   "user-read-private",
//   "user-library-read",
//   "user-library-modify",
//   "user-modify-playback-state",
//   "user-top-read",
//   "playlist-read-private",
//   "playlist-read-collaborative",
//   "user-read-email",
//   "playlist-modify-private",
//   "playlist-modify-public"
// ];

// const hash = window.location.hash
//   .substring(1)
//   .split("&")
//   .reduce(function(initial, item) {
//     if (item) {
//       var parts = item.split("=");
//       initial[parts[0]] = decodeURIComponent(parts[1]);
//     }
//     return initial;
//   }, {});
  
// window.location.hash = "";

// export default function Login(props) {
//   let navigate = useNavigate();

//   const[token,setToken]=useState("");

//   useEffect(() => {
//     let _token = hash.access_token;
//     console.log(_token);
//     if (_token) {
//       console.log("tokennnn");
//       setToken(_token);
//       navigate("/dashboard", {
//         state : {
//         accessToken: _token
//         }
//       });
//     }
//   }, [token]);
  
//   return (
//     <div className="App">
//       <header className="App-header">
//       {token==="" && (
//         <a
//           className="btn btn--loginApp-link"
//           href={"https://accounts.spotify.com/authorize?client_id=f6f8e70042bb47cd9c82ef26e1cb83a7&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-read-private%20playlist-read-collaborative%20streaming%20user-read-email%20playlist-modify-private%20playlist-modify-public"
//         }
//         >
//           Login to Spotify
//         </a>
//       )}
//       </header>
//     </div>
//   );
  
// }
