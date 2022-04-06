import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form, Card, Button, Row } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";

import Likes from "./Likes";
import Recommendations from "./Recommendations";
import TopSongs from "./TopSongs";
import TopArtists from "./TopArtists";
import TrackDetails from "./TrackDetails";

import "../css/Dashboard.css";
import happyImage from "../images/happy.jpg";
import calmImage from "../images/calm.jpg";
import sadImage from "../images/sad.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'

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

  const [happy, setHappy] = useState([]);
  const [happyList, setHappyList] = useState([]);
  const [isHappy, showHappy] = useState(false);

  const [acoustic, setAcoustic] = useState([]);
  const [acousticList, setAcousticList] = useState([]);
  const [isAcoustic, showAcoustic] = useState(false);

  const [sad, setSad] = useState([]);
  const [sadList, setSadList] = useState([]);
  const [isSad, showSad] = useState(false);

  const [trackURIs, setTrackURIs] = useState([]);

  let current = "";
  //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [displayMessage, setDisplayMessage] = useState("");

  
  function currentTime(){
    current= new Date().getTime().toString().substring(0,2);
    console.log(current);
    if (current>=6 && current<12){
      setDisplayMessage("Good Morning");
    }
    else if(current>=12 && current<18){
      setDisplayMessage("Good Afternoon");
    }
    else{
      setDisplayMessage("Good Evening");
    }
  }
  
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
  
    currentTime();
    
    //console.log(accessToken);
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi
      .getRecommendations({ seed_genres: "happy,dance" })
      .then((res) => {
        //console.log(res.body);
        setHappy(
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

    spotifyApi
      .getRecommendations({
        seed_tracks:
          "0YRYs1HSkie0eZ02ON4euX,4MzySNjSdv9ZegSD13IVNV,0ElpbbncWT9aS7mgoqEHbQ",
        seed_genres: "acoustic,chill",
      })
      .then((res) => {
        //console.log(res.body);
        setAcoustic(
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

    spotifyApi
      .getRecommendations({
        seed_tracks:
          "7LVHVU3tWfcxj5aiPFEW4Q,35KiiILklye1JRRctaLUb4,6PypGyiu0Y2lCDBN1XZEnP",
        seed_genres: "sad,soul",
      })
      .then((res) => {
        //console.log(res.body);
        setSad(
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
  }, [accessToken]);

  useEffect(() => {
    setHappyList(
      happy.map((track) => (
        <TrackDetails track={track} key={track.uri} chooseTrack={chooseTrack} />
      ))
    );

    setAcousticList(
      acoustic.map((track) => (
        <TrackDetails track={track} key={track.uri} chooseTrack={chooseTrack} />
      ))
    );

    setSadList(
      sad.map((track) => (
        <TrackDetails track={track} key={track.uri} chooseTrack={chooseTrack} />
      ))
    );
  }, [happy, acoustic, sad]);

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
      <Sidebar
        accessToken={accessToken}
        setLikes={setLikes}
        setRec={setRec}
        setTopSongs={setTopSongs}
        setTopArtists={setTopArtists}
        showHappy={showHappy}
        showAcoustic={showAcoustic}
        showSad={showSad}
      />

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

        <br />
        {/* <br /> */}
        
        {/* <h2>{displayMessage}</h2> */}
        
        {!isSad &&
          !isAcoustic &&
          !isHappy &&
          !likes &&
          !rec &&
          !topSongs &&
          !topArtists &&
          searchResults.length === 0 && (
            <div>
              <h2> Genres can only define so much.</h2>
              <h2>Go beyond with music for moods.</h2>
              <Row>
                <Card
                  className="text-center"
                  border="primary"
                  style={{ width: "18rem" }}
                >
                  <Card.Img variant="top" src={happyImage} />
                  <Card.Body>
                    <Card.Title>Happy Mix</Card.Title>
                    <Card.Text>
                      Hits that are guaranteed to boost your mood!
                    </Card.Text>
                    <Button variant="primary" onClick={() => showHappy(true)}>
                      CHECK IT OUT
                    </Button>
                  </Card.Body>
                </Card>

                <Card
                  className="text-center"
                  border="primary"
                  style={{ width: "18rem" }}
                >
                  <Card.Img variant="top" src={calmImage} />
                  <Card.Body>
                    <Card.Title>Acoustic</Card.Title>
                    <Card.Text>
                      Keep calm with this mix of laidback tracks.
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => showAcoustic(true)}
                    >
                      CHECK IT OUT
                    </Button>
                  </Card.Body>
                </Card>

                <Card
                  className="text-center"
                  border="primary"
                  style={{ width: "18rem" }}
                >
                  <Card.Img variant="top" src={sadImage} />
                  <Card.Body>
                    <br /> <br />
                    <Card.Title>Sad</Card.Title>
                    <Card.Text>Some tracks to let it all out...</Card.Text>
                    <br />
                    <Button variant="primary" onClick={() => showSad(true)}>
                      CHECK IT OUT
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            </div>
          )}

        {isHappy && searchResults.length === 0 && (
          <Container className="d-flex flex-column py-2">
            <div className="centerTracks">{happyList}</div>
          </Container>
        )}

        {isAcoustic && searchResults.length === 0 && (
          <Container className="d-flex flex-column py-2">
            <div className="centerTracks">{acousticList}</div>
          </Container>
        )}

        {isSad && searchResults.length === 0 && (
          <Container className="d-flex flex-column py-2">
            <div className="centerTracks">{sadList}</div>
          </Container>
        )}

        {likes && searchResults.length === 0 && (
          <Likes chooseTrack={chooseTrack} setTrackURIs={setTrackURIs} />
        )}

        {rec && searchResults.length === 0 && (
          <Recommendations chooseTrack={chooseTrack} />
        )}

        {topSongs && searchResults.length === 0 && (
          <TopSongs chooseTrack={chooseTrack} />
        )}

        {topArtists && searchResults.length === 0 && (
          <TopArtists chooseTrack={chooseTrack} />
        )}

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
          {searchResults.length === 0 &&
            !likes &&
            !rec &&
            !topSongs &&
            !topArtists && (
              <div className="text-center" style={{ whiteSpace: "pre" }}>
                {lyrics}
              </div>
            )}
        </div>

        <div>
        {/* <FontAwesomeIcon icon={faShuffle} size="lg" inverse /> */}
          <Player
            accessToken={accessToken}
            trackUri={playingTrack?.uri}
            style={{ width: "100%" , position: "sticky" }}
          />
        </div>

        {/* {(likes || rec || topSongs || isHappy || isSad || isAcoustic)  && (
          <div>
            <PlayerNext
              accessToken={accessToken}
              trackUri={trackURIs}
              style={{ width: "100%" }}
            />
          </div>
        )} */}
      </Container>
    </div>
  );
}
