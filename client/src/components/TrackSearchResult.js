import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" , color: "white" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} alt="albumUrl"/>
      <div className="ml-3" style={{marginLeft: "5px"}}>
        <div>{track.title}</div>
        <div>{track.artist}</div> 
        {/* className="text-muted" */}
      </div>
    </div>
  )
}