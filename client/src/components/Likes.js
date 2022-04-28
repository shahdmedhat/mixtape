import React, { useEffect, useState } from "react";
import SongDetails from "./SongDetails";
import TrackDetails from "./TrackDetails"; //---------------
import { Container, Button } from "react-bootstrap";
import Sidebar from "./Sidebar.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation } from "react-router-dom";
import "../css/SongList.css";
//import Player from "./Player";
import SpotifyPlayer from "react-spotify-web-playback";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function Likes(props) {
  let location = useLocation();
  const accessToken = location.state.accessToken; //printed sah
  //let chooseTrack = location.state.chooseTrack;
  const [list, setList] = useState([]);
  const [likes, setLikes] = useState([]);

  const [uris, setURIs] = useState([]);

  //const [temp, setTemp] = useState("");
  //const[trackURIs,setTrackURIs] = useState([]);

  function shuffle() {
    //props.setUri(uris);
    let first = uris.shift();
    console.log(first);
    props.setPlayingTrack(first);
    props.setQueue(uris);
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return; //don't query if no access token
    spotifyApi.getMySavedTracks().then((res) => {
      //let listx=[]
      // for (var k in res.body.items) {
      //   listx.push(res.body.items[k].track);
      // }
      // setURIs(listx);
      
      setLikes(
        res.body.items.map((item) => {
          const isLiked = spotifyApi
            .containsMySavedTracks([item.track.uri.split(":")[2]])
            .then(
              function (data) {
                // An array is returned, where the first element corresponds to the first track ID in the query
                var trackIsInYourMusic = data.body[0];
                if (trackIsInYourMusic) {
                  //console.log("Track was found in the user's Your Music library");
                  //setTemp("true");
                  return true;
                } else {
                  //console.log("Track was not found.");
                  //setTemp("false");
                  return false;
                }
              },
              function (err) {
                console.log("Something went wrong!", err);
              }
            );

          const smallestAlbumImage = item.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            item.track.album.images[0] //loop through images, if current.size < smallest -> update smallest
          );

          const largestAlbumImage = item.track.album.images.reduce(
            (largest, image) => {
              if (image.height > largest.height) return image;
              return largest;
            },
            item.track.album.images[0] //loop through images, if current.size < smallest -> update smallest
          );

          return {
            artist: item.track.artists[0].name,
            title: item.track.name,
            uri: item.track.uri,
            albumUrl: smallestAlbumImage.url,
            isLiked: isLiked,
            image: largestAlbumImage.url,
          };
        })
      );
    });
  }, [accessToken, props.addToLikes, props.removeFromLikes]);

  useEffect(() => {
    let shuffled = likes
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  
    setURIs(shuffled)
    
    setList(
      likes.map((track) => (
        <TrackDetails
          track={track}
          key={track.uri}
          chooseTrack={props.chooseTrack}
          handleQueue={props.handleQueue}
          setShowToast={props.setShowToast}
          setShowModal={props.setShowModal}
          addTrackToPlaylist={props.addTrackToPlaylist}
          queue={props.queue}
          addToLikes={props.addToLikes}
          removeFromLikes={props.removeFromLikes}
          setPlayingTrack={props.setPlayingTrack}
          setQueue={props.setQueue}
        />
      )) //---------------
    );

    // props.setTrackURIs(
    //   likes.map((track)=> track.uri)
    // )
  }, [likes]);

  if (!accessToken) return null;
  return (
    <div style={{ overflowY: "scroll", justifyContent: "center", overflow:'hidden' }}>
      {/* style={{ maxHeight: "50vh" }} */}
      {/* <Sidebar accessToken={accessToken} /> */}
      <Container
        className="d-flex flex-column py-2"
        //style={{ height: "100vh" }}
      >
        <h1 style={{ textAlign: "center", color: "white" }}>
          Liked Songs
          <Button
            variant="success"
            style={{ float: "right", marginRight: "40px" }}
            size="lg"
            onClick={() => {
              shuffle();
            }}
          >
            Shuffle
          </Button>
        </h1>

        <div>{list}</div>
        {/* className="centerTracks" */}
        
        
        {/* <SpotifyPlayer
                token={accessToken}
                showSaveIcon
                callback={(state) => {
                  console.log(props)
                  if (!state.isPlaying && props.queue.length === 0) {
                    props.setPlay(false);
                  }

                  if (
                    !state.isPlaying &&
                    props.queue.length > 0 &&
                    state.progressMs === 0
                  ) {
                    var uris = [];
                    for (var k in props.queue) {
                      uris.push(props.queue[k].uri);
                    }

                    props.setUri(uris);
                    let first = props.queue.shift();
                    props.setPlayingTrack(first);

                  }
                }}
                play={props.play}
                uris={props.uri}
                styles={{
                  activeColor: "#0f0",
                  bgColor: "#3C3E4D",
                  color: "#fff",
                  loaderColor: "#fff",
                  sliderColor: "#fff",
                  trackArtistColor: "#ccc",
                  trackNameColor: "#fff",
                  height: "60px",
                }}
              /> */}
        
      </Container>
    </div>
  );
}
