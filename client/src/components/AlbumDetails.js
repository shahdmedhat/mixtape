import React, { Component, useState, useEffect } from "react";
import { Container, Button, Row,Card } from "react-bootstrap";
import "../css/TrackDetails.css";
import "../css/Dashboard.css";

import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
  });
  
export default function AlbumDetails(props) {
  const accessToken= props.accessToken;
  const album = props.album;
  
  function openAlbum(){
    
  spotifyApi.getAlbum(album.id).then((res) => {
    props.setAlbumTracks(
      res.body.tracks.items.map((track) => {
        const isLiked = spotifyApi
        .containsMySavedTracks([track.uri.split(":")[2]])
        .then(
          function (data) {
            var trackIsInYourMusic = data.body[0];
            if (trackIsInYourMusic) {
              return true;
            } else {
              return false;
            }
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
      
        const smallestAlbumImage = res.body.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          res.body.images[0] 
        );

        const largestAlbumImage = res.body.images.reduce(
          (largest, image) => {
            if (image.height > largest.height) return image;
            return largest;
          },
          res.body.images[0] 
        );

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
          image: largestAlbumImage.url,
          isLiked: isLiked
        };
      })
    );
  });

    props.setView("newReleasesDetails")
  
  }
  
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  
  return (
    <Card
    className="cardItem"
    style={{ width: "14rem", height:"21rem", marginRight: "50px", marginBottom: "20px", textAlign: "center", cursor: "pointer" }}
    onClick={() => {openAlbum()}}
  >
    <Card.Img variant="top" style={{width:"200px",height:"200px", marginTop: "5px", marginLeft: "auto", marginRight: "auto"}} src={album.image} />
    <Card.Body>
      <h6>{album.title}</h6>
      <Card.Text>
        {album.artist}
    </Card.Text>
      {/* <Button
        variant="primary"
      >
        CHECK IT OUT
      </Button> */}
    </Card.Body>
  </Card>

  );
}
