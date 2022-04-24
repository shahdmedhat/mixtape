import React, { useEffect, useState } from "react";
import TrackDetails from "./TrackDetails";
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation } from "react-router-dom";
import "../css/SongList.css";
//import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function TopSongs(props) {
  let location = useLocation();
  const accessToken = location.state.accessToken; //printed sah
  //let chooseTrack = location.state.chooseTrack;

  const [list, setList] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return; //don't query if no access token
    spotifyApi.getMyTopTracks().then((res) => {
      // console.log(res.body);
      setTopTracks(
        res.body.items.map((track) => {
          const isLiked=spotifyApi.containsMySavedTracks([track.uri.split(":")[2]])
          .then(function(data) {
            // An array is returned, where the first element corresponds to the first track ID in the query
            var trackIsInYourMusic = data.body[0];
            if (trackIsInYourMusic) {
              //console.log('Track was found in the user\'s Your Music library');
              return true;
            } else {
              //console.log('Track was not found.');
              return false;
            }
          }, function(err) {
            console.log('Something went wrong!', err);
          });
          
          const smallestAlbumImage = track.album.images.reduce(
            //reduce to one value
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0] //loop through images, if current.size < smallest -> update smallest
          );
          
          const largestAlbumImage = track.album.images.reduce(
            (largest, image) => {
              if (image.height > largest.height) return image;
              return largest;
            },
            track.album.images[0] //loop through images, if current.size < smallest -> update smallest
          );
          
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            isLiked: isLiked,
            image: largestAlbumImage.url
          };
        })
      );
    });
  }, [accessToken]);

  useEffect(() => {
    setList(
      topTracks.map((track) => <TrackDetails track={track} key={track.uri} chooseTrack={props.chooseTrack} handleQueue={props.handleQueue} setShowToast={props.setShowToast} setShowModal={props.setShowModal} addTrackToPlaylist={props.addTrackToPlaylist} queue={props.queue} addToLikes={props.addToLikes} removeFromLikes={props.removeFromLikes} />)
    );
  }, [topTracks]);

  if (!accessToken) return null;
  return (
    <div style={{ overflowY: 'scroll', overflow:'hidden'}}>
      {/* <Sidebar accessToken={accessToken} /> */}
      <Container
        className="d-flex flex-column py-2"
        // style={{ height: "100vh" }}
      >
        <h1 style={{ textAlign: "center" , color: "white" }}> Most Played Songs</h1>

        <div>{list}</div>

        {/* <div>
        <Player accessToken={accessToken} />
      </div> */}
      </Container>
    </div>
  );
}
