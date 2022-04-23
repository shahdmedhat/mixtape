import React, { useEffect, useState } from "react";
import ArtistDetails from "./ArtistDetails";
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation } from "react-router-dom";
import "../css/SongList.css";
//import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function TopArtists(props) {
  let location = useLocation();
  const accessToken = location.state.accessToken; //printed sah
  //let chooseTrack = location.state.chooseTrack;

  const [list, setList] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return; //don't query if no access token
    spotifyApi.getMyTopArtists().then((res) => {
      console.log(res.body);
      setTopArtists(
        res.body.items.map((artist) => {
          const smallestAlbumImage = artist.images.reduce(
            //reduce to one value
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            artist.images[0] //loop through images, if current.size < smallest -> update smallest
          );
          return {
            name: artist.name,
            uri: artist.uri,
            artistUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [accessToken]);

  useEffect(() => {
    setList(
      topArtists.map((artist) => <ArtistDetails artist={artist} key={artist.uri} />)
    );
  }, [topArtists]);

  if (!accessToken) return null;
  return (
    <div style={{ overflowY: 'scroll' , overflow:'hidden' }}>
      {/* <Sidebar accessToken={accessToken} /> */}
      <Container
        className="d-flex flex-column py-2"
        // style={{ height: "100vh" }}
      >
        <h1 style={{ textAlign: "center" , color: "white" }}> TOP ARTISTS</h1>

        <div style={{color: "white"}}>{list}</div>

      </Container>
    </div>
  );
}
