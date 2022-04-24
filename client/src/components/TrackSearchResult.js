import React from "react"
import { Container } from "react-bootstrap";
import "../css/TrackDetails.css";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
  
    <div className="songRow" onClick={handlePlay} style={{ cursor: "pointer"}}>
    <Container className="d-flex m-2 align-items-center" >
      <img
        src={track.albumUrl}
        className="songRow__album"
        alt="albumUrl"
      />

      <div  className="songRow__info" >
      {/* className="ml-3" style={{ cursor: "pointer", marginLeft: "5px" }} */}
        <h1 style={{alignItems: "center"}}>{track.title}</h1>
        <h1>{track.artist}</h1>
        {/* className="text-muted" */}
      </div>

    </Container>
    </div>
  
  )
}