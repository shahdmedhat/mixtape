import React, { Component } from "react";
import { Container, Button,Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);

export default function TrackDetails(props) {
  let location = useLocation();
  let navigate = useNavigate();
  const track = props.track;
  function handlePlay() {
    //navigate("/dashboard",{ state: {track: track , accessToken: location.state.accessToken} });
    props.chooseTrack(track);
  }

  function addToQueue() {
    //navigate("/dashboard",{ state: {track: track , accessToken: location.state.accessToken} });
    props.handleQueue(track);
    props.setShowToast(true);
  }

  return (
    <Container className="d-flex m-2 align-items-center">
      <img
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
        alt="albumUrl"
      />

      <div className="ml-3" style={{ cursor: "pointer" }} onClick={handlePlay}>
        
        <div>{track.title}</div>

        <div>{track.artist}</div>
        {/* className="text-muted" */}
      </div>

      {/* <Button variant="success" onClick={() => {addToQueue();}}>
          Add To Queue
      </Button> */}

    <Row>
    <FontAwesomeIcon icon="fa-solid fa-circle-plus fa-2xl" onClick={addToQueue} style={{ cursor: "pointer", float: "right" }} />

    </Row>
    </Container>
  );
}
