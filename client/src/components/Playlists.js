import React, { useEffect, useState } from "react";
import TrackDetails from "./TrackDetails";
import { Container, Row, Card, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation } from "react-router-dom";
import "../css/SongList.css";
import "../css/TrackDetails.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

//import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function Playlists(props) {
  let location = useLocation();
  var accessToken = null;
  if (location.state) {
    accessToken = location.state.accessToken; //printed sah
  }
  //let chooseTrack = location.state.chooseTrack;

  if (accessToken === null) {
    accessToken = props.accessToken;
  }

  const [list, setList] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  const [uris, setURIs] = useState([]);

  function shuffle(){
    let first = uris.shift();
    console.log(first);
    props.setPlayingTrack(first);
    props.setQueue(uris);
  }
  
  function getPlaylistTracks(id, title) {
    if (!accessToken) return;

    setPlaylistName(title);

    spotifyApi.getPlaylistTracks(id).then((res) => {
      //console.log(res.body);
      setPlaylistTracks(
        res.body.items.map((item) => {
          const isLiked = spotifyApi
            .containsMySavedTracks([item.track.uri.split(":")[2]])
            .then(
              function(data) {
                var trackIsInYourMusic = data.body[0];
                if (trackIsInYourMusic) {
                  return true;
                } else {
                  return false;
                }
              },
              function(err) {
                console.log("Something went wrong!", err);
              }
            );

          const smallestAlbumImage = item.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            item.track.album.images[0]
          );

          const largestAlbumImage = item.track.album.images.reduce(
            (largest, image) => {
              if (image.height > largest.height) return image;
              return largest;
            },
            item.track.album.images[0]
          );

          return {
            title: item.track.name,
            artist: item.track.artists[0].name,
            uri: item.track.uri,
            albumUrl: smallestAlbumImage.url,
            isLiked: isLiked,
            image: largestAlbumImage.url,
          };
        })
      );
    });
  }

  useEffect(() => {
  
    let shuffled = playlistTracks
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  
    setURIs(shuffled)
    
    setList(
      playlistTracks.map((track) => (
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
          listener={props.listener}
        />
      ))
    );
  }, [playlistTracks]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return; //don't query if no access token

    spotifyApi.getUserPlaylists().then((res) => {
      //console.log(res.body);
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
            id: playlist.id.toString(),
            href: playlist.tracks.href,
          };
        })
      );
    });
  }, [accessToken]);

  if (!accessToken) return null;
  return (
    <div style={{ overflowY: "scroll", overflow: "hidden" }}>
      {list.length === 0 && (
        <Container
          className="d-flex flex-column py-2"
          // style={{ height: "100vh" }}
        >
          <div style={{ font: "24px bold", color: "white", cursor: "pointer" }}>
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-left fa-inverse"
              onClick={() => {
                props.setView("");
              }}
            />
          </div>

          <h1 style={{ textAlign: "center", color: "white" }}> Playlists </h1>
          <br />

          {playlists.length !== 0 &&
            playlists.map((playlist) => (
              // <Card
              //   className="text-center"
              //   border="primary"
              //   style={{ width: "18rem" }}
              // >
              //   <Card.Img variant="top" src={playlist.albumUrl} />
              //   <Card.Body>
              //     <Card.Title> {playlist.title} </Card.Title>

              //     <Button
              //       variant="primary"
              //       onClick={() => getPlaylistTracks(playlist.id, playlist.title)}
              //     >
              //       CHECK IT OUT
              //     </Button>
              //   </Card.Body>
              // </Card>

              // <Container
              // //className="centerTracks"
              // // style={{ cursor: "pointer" }}
              // //onClick={this.handlePlay}
              // >
              //   <img
              //     src={playlist.albumUrl}
              //     style={{ height: "64px", width: "64px", cursor: "pointer" }}
              //     alt="albumUrl"
              //     onClick={() => getPlaylistTracks(playlist.id, playlist.title)}
              //   />
              //   <div className="ml-3">
              //     <div style={{ color: "white" }}>{playlist.title}</div>
              //     {/* <div className="text-muted">{this.props.track.artist}</div> */}
              //   </div>
              //   <br />
              // </Container>

              <div
                className="songRow"
                style={{ cursor: "pointer" }}
                onClick={() => getPlaylistTracks(playlist.id, playlist.title)}
              >
                <Container className="d-flex m-2 align-items-center">
                  <img
                    src={playlist.albumUrl}
                    className="songRow__album"
                    alt="albumUrl"
                  />

                  <div className="songRow__info">
                    <h1 style={{ alignItems: "center" }}>{playlist.title}</h1>
                  </div>
                </Container>
              </div>
            ))}
        </Container>
      )}

      {list.length !== 0 && (
        <Container className="d-flex flex-column py-2">
          <Row>
            <div
              style={{ font: "24px bold", color: "white", cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-left fa-inverse"
                onClick={() => {
                  setList([]);
                }}
              />
            </div>
            <h1 style={{ textAlign: "center", color: "white" }}>
              {" "}
              {playlistName}{" "}
              <Button
            variant="success"
            style={{ float: "right", marginRight: "25px" }}
            size="lg"
            onClick={() => {
              shuffle();
            }}
          >
            Shuffle
          </Button>
            </h1>
          </Row>
          <div>{list}</div>
        </Container>
      )}
    </div>
  );
}
