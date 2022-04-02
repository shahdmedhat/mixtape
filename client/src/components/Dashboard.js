import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";

import Likes from "./Likes";
import Recommendations from "./Recommendations";
import TopSongs from "./TopSongs";
import TopArtists from "./TopArtists";

import "../css/Dashboard.css";

import { useLocation } from "react-router-dom"; //---------------

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function Dashboard({ props, code }) {
  let location = useLocation(); //---------------

  const accessToken = useAuth(code);

  if (accessToken === "undefined") {
    //---------------
    accessToken = props.accessToken;
  }

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  const [track, setTrack] = useState(); //---------------
  const [likes, setLikes] = useState(false);
  const [rec, setRec] = useState(false);
  const [topSongs, setTopSongs] = useState(false);
  const [topArtists, setTopArtists] = useState(false);


  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]); //everytime playing track changes

  useEffect(() => {
    //console.log(accessToken);
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]); //nth to search for
    if (!accessToken) return; //don't query if no access token

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
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

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="dashboard">
      <Sidebar accessToken={accessToken} setLikes={setLikes} setRec={setRec} setTopSongs={setTopSongs} setTopArtists={setTopArtists}/>

      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
              
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
         {likes && searchResults.length === 0 && 
            <Likes chooseTrack={chooseTrack}/>
         }
         
         {rec && searchResults.length === 0 && 
            <Recommendations chooseTrack={chooseTrack}/>
         }
         
         {topSongs && searchResults.length === 0 && 
            <TopSongs chooseTrack={chooseTrack}/>
         }
         
         {topArtists && searchResults.length === 0 && 
            <TopArtists chooseTrack={chooseTrack}/>
         }

        <div
          className="flex-grow-1 my-2"
          style={{ overflowY: "auto" }} //scrollable
        >
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
          {searchResults.length === 0 && !likes && !rec && !topSongs && !topArtists && (
            <div className="text-center" style={{ whiteSpace: "pre" }}>
              {lyrics}
            </div>
          )}
        </div>
        
        <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} style={{ width: "100%" }} />
        </div>
      </Container>
    </div>
  );
}
