import React, { useEffect, useState } from "react";
import SongDetails from "./SongDetails";
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation } from "react-router-dom";
import "../css/TopSongs.css";
//import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function TopSongs() {
  let location = useLocation();
  const accessToken = location.state.accessToken; //printed sah
  let chooseTrack = location.state.chooseTrack; //printed sah

  const [list, setList] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return; //don't query if no access token
    spotifyApi.getMyTopTracks().then((res) => {
      //console.log(res.body);
      setTopTracks(
        res.body.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            //reduce to one value
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
  }, []);

  useEffect(() => {
    setList(
      topTracks.map((track) => <SongDetails chooseTrack={chooseTrack} track={track} key={track.uri} />)
    );
  }, [topTracks]);

  if (!accessToken) return null;
  return (
    <div>
      <Sidebar accessToken={accessToken} />
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <h1 style={{ textAlign: "center" }}> TOP SONGS</h1>

        <div className="centerTracks">{list}</div>

        {/* <div>
        <Player accessToken={accessToken} />
      </div> */}
      </Container>
    </div>
  );
}
