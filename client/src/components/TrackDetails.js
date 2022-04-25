import React, { Component, useState, useEffect } from "react";
import { Container, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../css/TrackDetails.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);
library.add(far);

export default function TrackDetails(props) {
  let location = useLocation();
  let navigate = useNavigate();

  const [likeIcon, changeLikeIcon] = useState("fa-regular fa-heart fa-10x");

  const track = props.track;
  function handlePlay() {
    //navigate("/dashboard",{ state: {track: track , accessToken: location.state.accessToken} });
    if (!props.showQueue) 
      props.chooseTrack(track);
    
  //     if(props.showQueue){
  //     for (var k in props.queue) {
  //       if (props.queue[k].uri===track.uri){
  //         let list=props.queue;
  //         props.setQueue(list.slice(k+1));
  //         props.queue.slice(k+1);
  //       }
  //   }
  //  }
  
  }

  useEffect(() => {
    //console.log(props.track);
    track.isLiked.then(
      (result) => {
        if (result) {
          changeLikeIcon("fa-solid fa-heart fa-10x");
        } else {
          changeLikeIcon("fa-regular fa-heart fa-10x");
        }
      },
      function(error) {
        console.log("error");
      }
    );
  }, []);

  function addToQueue() {
    //navigate("/dashboard",{ state: {track: track , accessToken: location.state.accessToken} });
    props.handleQueue(track, props.queue);
    props.setShowToast(true);
  }

  return (
    <div className="songRow">
      <Container className="d-flex m-2 align-items-center">
        {/* style={{backgroundColor: 'white', borderRadius: '20px'}} */}
        <img
          src={track.albumUrl}
          // style={{ height: "64px", width: "64px" }}
          className="songRow__album"
          alt="albumUrl"
        />

        <div className="songRow__info" onClick={handlePlay}>
          {/* className="ml-3" style={{ cursor: "pointer", marginLeft: "5px" }} */}
          <h1 style={{ alignItems: "center" }}>{track.title}</h1>
          <h1>{track.artist}</h1>
          {/* className="text-muted" */}
        </div>

        {/* , justifyContent:"center", display:"flex", margin: "0px 0px 0px 0px" */}
        <div style={{ textAlign: "right", margin: "0px 0px 0px auto" }}>
          <div style={{ fontSize: "24px" }}>
          {!props.showQueue && (
            <Container>
              <FontAwesomeIcon
                icon={likeIcon}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (likeIcon === "fa-regular fa-heart fa-10x") {
                    props.addToLikes(track.uri.split(":")[2]);
                    changeLikeIcon("fa-solid fa-heart fa-10x");
                  } else {
                    props.removeFromLikes(track.uri.split(":")[2]);
                    changeLikeIcon("fa-regular fa-heart fa-10x");
                  }
                  //likeIcon==="fa-regular fa-heart fa-10x"? changeLikeIcon("fa-solid fa-heart fa-10x"): changeLikeIcon("fa-regular fa-heart fa-10x")
                }}
              />
              <FontAwesomeIcon
                icon="fa-solid fa-circle-plus fa-10x"
                style={{
                  cursor: "pointer",
                  marginLeft: "9px",
                  marginRight: "9px",
                }}
                // ,margin:"0px 0px auto auto"
                onClick={() => {
                  props.setShowModal(true);
                  props.addTrackToPlaylist(track);
                }}
              />

              
                <Button
                  variant="success"
                  onClick={() => {
                    addToQueue();
                  }}
                >
                  Add To Queue
                </Button>

            </Container>
           )}
          </div>
        </div>
      </Container>
    </div>

    //   <div class="songItem">
    //   <span class="songName">{track.title}</span>
    //   <span class="songName">{track.artist}</span>
    //   <span class="songlistplay">
    //     <span class="timestamp">
    //       05:13 <i id="6" class="far songItemPlay fa-play-circle"></i>{" "}
    //     </span>
    //   </span>
    // </div>
  );
}
