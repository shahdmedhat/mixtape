import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function TrackDetails(props) {
  let location = useLocation();
  let navigate = useNavigate();
  const track = props.track;
  function handlePlay() {
    //navigate("/dashboard",{ state: {track: track , accessToken: location.state.accessToken} });
    props.chooseTrack(track)
  }

  return (
    <Container
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
        alt="albumUrl"
      />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </Container>
  );
}
