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
