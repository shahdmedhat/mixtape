import React, { useEffect, useState } from "react";
import SongDetails from "./SongDetails";
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation } from "react-router-dom";
import "../css/SongList.css";
//import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function Playlists() {
  let location = useLocation();
  const accessToken = location.state.accessToken; //printed sah
  //let chooseTrack = location.state.chooseTrack;
  const [list, setList] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return; //don't query if no access token
    spotifyApi.getUserPlaylists().then((res) => {
      console.log(res.body);
      setPlaylists(
        res.body.items.map((playlist) => {
          const smallestAlbumImage = playlist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            playlist.images[0] //loop through images, if current.size < smallest -> update smallest
          );
          return {
            title: playlist.name,
            uri: playlist.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [accessToken]);

  useEffect(() => {
    // setList(
    //     playlists.map((track) => <SongDetails track={track} key={track.uri} />)
    // );
  }, [playlists]);

  if (!accessToken) return null;
  return (
    <div>
      <Sidebar accessToken={accessToken} />
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <h1 style={{ textAlign: "center" }}> PLAYLISTS </h1>
        <br/>
        {playlists.length !== 0 &&
          playlists.map((playlist) => (
            <Container
              className="centerTracks"
              // style={{ cursor: "pointer" }}
              //onClick={this.handlePlay}
            >
              <img
                src={playlist.albumUrl}
                style={{ height: "64px", width: "64px" }}
                alt="albumUrl"
              />
              <div className="ml-3">
                <div>{playlist.title}</div>
                {/* <div className="text-muted">{this.props.track.artist}</div> */}
              </div>
              <br/>
            </Container>
          ))}
      </Container>
    </div>
  );
}
