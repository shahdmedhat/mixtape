import React, { useEffect, useState } from "react";
import TrackDetails from "./TrackDetails";
import { Container } from "react-bootstrap";
// import Sidebar from "./Sidebar.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation } from "react-router-dom";
import "../css/SongList.css";
//import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function Recommendations(props) {
  let location = useLocation();
  const accessToken = location.state.accessToken; //printed sah
  //let chooseTrack = location.state.chooseTrack;
  const [list, setList] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [topFive, setTopFive] = useState([]);
  //const [count, setCount] = useState(0);

  const [rec, setRec] = useState([]);

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
          return {
            id: track.id,
          };
        })
      );
    });
  }, [accessToken]);


  useEffect(() => {
    setTopFive(topTracks.slice(0,5));
  }, [topTracks]);
  
  
   useEffect(() => {
    // console.log(topFive);
    var final=[]
    topFive.forEach(function (item) {
        final.push(item.id);
        //setCount(count+1);
    });
    
    if (!accessToken) return; //don't query if no access token
    
    spotifyApi.getRecommendations({seed_tracks: final.toString()}).then((res) => {
      console.log(res.body);
        setRec(
          res.body.tracks.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0] //loop through images, if current.size < smallest -> update smallest
            );
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
    });
    
    spotifyApi.getAvailableGenreSeeds().then((res) => {
      console.log(res.body);
    });
    
   }, [accessToken,topFive]);

    useEffect(() => {
      setList(
        rec.map((track) => <TrackDetails track={track} key={track.uri} chooseTrack={props.chooseTrack} handleQueue={props.handleQueue} setShowToast={props.setShowToast} />)
      );
    }, [rec]);

  if (!accessToken) return null;
  return (
    <div style={{ overflowY: 'scroll' }}>
      {/* style={{ maxHeight: "50vh" }} */}
      {/* <Sidebar accessToken={accessToken} /> */}
      <Container
        className="d-flex flex-column py-2"
        // style={{ height: "100vh" }}
      >
        <h1 style={{ textAlign: "center" , color: "white" }}> BASED ON YOUR TASTE... </h1>

        <div>{list}</div>
      </Container>
    </div>
  );
}
