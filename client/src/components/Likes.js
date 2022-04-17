import React, { useEffect, useState } from "react";
import SongDetails from "./SongDetails";
import TrackDetails from "./TrackDetails"; //---------------
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation } from "react-router-dom";
import "../css/SongList.css";
//import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function Likes(props) {
  let location = useLocation();
  const accessToken = location.state.accessToken; //printed sah
  //let chooseTrack = location.state.chooseTrack;
  const [list, setList] = useState([]);
  const [likes, setLikes] = useState([]);
  //const[trackURIs,setTrackURIs] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return; //don't query if no access token
    spotifyApi.getMySavedTracks().then((res) => {
      setLikes(
        res.body.items.map((item) => {
          const smallestAlbumImage = item.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            item.track.album.images[0] //loop through images, if current.size < smallest -> update smallest
          );
          return {
            artist: item.track.artists[0].name,
            title: item.track.name,
            uri: item.track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [accessToken]);

  useEffect(() => {
    setList(
      likes.map((track) => <TrackDetails track={track} key={track.uri} chooseTrack={props.chooseTrack} handleQueue={props.handleQueue} setShowToast={props.setShowToast} />) //---------------
    );
    
    // props.setTrackURIs(
    //   likes.map((track)=> track.uri)
    // )
  }, [likes]);

  if (!accessToken) return null;
  return (
    <div style={{ overflowY: 'scroll' , justifyContent: 'center'}}>
    {/* style={{ maxHeight: "50vh" }} */}
      {/* <Sidebar accessToken={accessToken} /> */}
      <Container
        className="d-flex flex-column py-2"
        //style={{ height: "100vh" }}
      >
        <h1 style={{ textAlign: "center" }}> LIKES </h1>

        <div className="centerTracks">{list}</div>

      </Container>
    </div>
  );
}
