import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import {
  Container,
  Form,
  Card,
  Button,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
//import Scrollbar from "./Scrollbar.jsx";
import "../css/Scrollbar.css";

import Likes from "./Likes";
import Recommendations from "./Recommendations";
import TopSongs from "./TopSongs";
import TopArtists from "./TopArtists";
import Playlists from "./Playlists";
import TrackDetails from "./TrackDetails";

import "../css/Dashboard.css";
import happyImage from "../images/happy.jpg";
import calmImage from "../images/calm.jpg";
import sadImage from "../images/sad.jpg";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation } from "react-router-dom"; //---------------

library.add(fas);

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
  const [playlists, setPlaylists] = useState(false);

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
  const [queue, setQueue] = useState([]);

  let current = "";
  //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [displayMessage, setDisplayMessage] = useState("");

  const [player, showPlayer] = useState(false);
  const [view, setView] = useState("");

  const [firstColor, setFirstColor] = useState("");
  const [secondColor, setSecondColor] = useState("");

  const [showToast, setShowToast] = useState(false);

  function handlePlayer() {
    if (player) {
      showPlayer(false);
      switch (view) {
        case "likes":
          setLikes(true);
          break;
        case "rec":
          setRec(true);
          break;
        case "artists":
          setTopArtists(true);
          break;
        case "tracks":
          setTopSongs(true);
          break;
        case "playlists":
          setPlaylists(true);
          break;
        case "happy":
          showHappy(true);
          break;
        case "sad":
          showSad(true);
          break;
        case "acoustic":
          showAcoustic(true);
          break;
      }

      setFirstColor("#FFFFFF");
      setSecondColor("#FFFFFF");
    } else {
      //expand
      showPlayer(true);
      setLikes(false);
      setRec(false);
      setTopSongs(false);
      setTopArtists(false);
      setPlaylists(false);
      showHappy(false);
      showAcoustic(false);
      showSad(false);

      setFirstColor("#dc2424");
      setSecondColor("#4a569d");
    }
  }

  function currentTime() {
    current = new Date().getTime().toString().substring(0, 2); //does not get current time
    //console.log(current);
    if (current >= 6 && current < 12) {
      setDisplayMessage("Good Morning");
    } else if (current >= 12 && current < 18) {
      setDisplayMessage("Good Afternoon");
    } else {
      setDisplayMessage("Good Evening");
    }
  }

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  function handleQueue(track) {
    //console.log("track uris", trackURIs);
    // if(trackURIs.length ===0){
    //   console.log("track uris empty")
    //   var list = [];
    //   list.push(playingTrack?.uri, track.uri);
    // }
    // else{
    //   var list = [...trackURIs];
    //   list.push(track.uri);
    // }

    var list = [...trackURIs];
    list.push(playingTrack?.uri, track.uri);

    //list.push(track.uri);
    //console.log(list);
    //console.log(playingTrack);

    // var list=[...queue];
    // console.log(list);
    //["spotify:track:5pSSEkT0963muzzIjsVkrs","spotify:track:2iA9swOmMhBUFdbflno6GE",]

    setTrackURIs(list);

    var listx = [];
    for (var k in queue) {
      listx.concat(queue[k]);
    }
    
    console.log("before: ",listx);
    listx.push(track);
    console.log("after", listx);
    //setQueue(queue.push(track.uri)); or concat?

    setQueue(listx);
    
    // if(!localStorage.getItem('queue')) {
    //   setQueue(queue.concat(track));
    //   localStorage.setItem('queue', listx);

    // }
    // else{
    //   setQueue(localStorage.getItem('queue').concat(track));
    // }
    
    console.log("SONG ADDED TO QUEUE");

    //console.log(queue); //[]???????
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

    spotifyApi.getMyCurrentPlaybackState().then(
      function (data) {
        //PLAYING IN PRIVATE USING PLAYER OBJECTTTTTT
        if (data.body && data.body.is_playing) {
          console.log("User is currently playing something!");
          spotifyApi.getMyCurrentPlayingTrack().then(
            function (data) {
              console.log("Now playing: " + data.body.item.name);
            },
            function (err) {
              console.log("Something went wrong!", err);
            }
          );
        } else {
          console.log("User is not playing anything, or doing so in private.");
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    console.log(playingTrack.uri);

    // var list = [];
    // list.push(playingTrack.uri);
    // setTrackURIs(list);

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

    setFirstColor("#FFFFFF");
    setSecondColor("#FFFFFF");
    // setPlaylists(true);
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
    // <div
    //   style={{
    //     overflowY: "scroll",
    //     background: "linear-gradient(" + firstColor + "," + secondColor + ")",
    //   }}
    // >

    <div className="dashboard">
      {/* <Scrollbar/> */}

      <Sidebar
        accessToken={accessToken}
        setLikes={setLikes}
        setRec={setRec}
        setTopSongs={setTopSongs}
        setTopArtists={setTopArtists}
        setPlaylists={setPlaylists}
        showHappy={showHappy}
        showAcoustic={showAcoustic}
        showSad={showSad}
        showPlayer={showPlayer}
        setView={setView}
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

        {showToast && (
          <ToastContainer className="p-3" position={"middle-center"}>
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={2000}
              autohide
              bg={'dark'}
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Notification</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body style={{color: "white"}}>ADDED TO QUEUE</Toast.Body>
            </Toast>
          </ToastContainer>
        )}

        {/* <br /> */}

        {/* <Playlists chooseTrack={chooseTrack} accessToken={accessToken}/> */}

        {/* <h2>{displayMessage}</h2> */}
        {!isSad &&
          !isAcoustic &&
          !isHappy &&
          !likes &&
          !rec &&
          !topSongs &&
          !topArtists &&
          !playlists &&
          !player &&
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
                    <Button
                      variant="primary"
                      onClick={() => {
                        showHappy(true);
                        setView("happy");
                      }}
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
                  <Card.Img variant="top" src={calmImage} />
                  <Card.Body>
                    <Card.Title>Acoustic</Card.Title>
                    <Card.Text>
                      Keep calm with this mix of laidback tracks.
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        showAcoustic(true);
                        setView("acoustic");
                      }}
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
                    <Button
                      variant="primary"
                      onClick={() => {
                        showSad(true);
                        setView("sad");
                      }}
                    >
                      CHECK IT OUT
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            </div>
          )}

        {isHappy && searchResults.length === 0 && (
          <div style={{ overflowY: "scroll" }}>
            <Container className="d-flex flex-column py-2">
              {/* <h1 style={{ textAlign: "center" }}>HAPPY MIX</h1> */}
              <div className="centerTracks">{happyList}</div>
            </Container>
          </div>
        )}

        {isAcoustic && searchResults.length === 0 && (
          <div style={{ overflowY: "scroll" }}>
            <Container className="d-flex flex-column py-2">
              {/* <h1 style={{ textAlign: "center" }}>ACOUSTIC</h1> */}
              <div className="centerTracks">{acousticList}</div>
            </Container>
          </div>
        )}

        {isSad && searchResults.length === 0 && (
          <div style={{ overflowY: "scroll" }}>
            <Container className="d-flex flex-column py-2">
              {/* <h1 style={{ textAlign: "center" }}>SAD</h1> */}
              <div className="centerTracks">{sadList}</div>
            </Container>
          </div>
        )}

        {likes && searchResults.length === 0 && (
          <div className="scrollbar scrollbar-lady-lips">
            <Likes
              chooseTrack={chooseTrack}
              setTrackURIs={setTrackURIs}
              handleQueue={handleQueue}
              setShowToast={setShowToast}
            />
          </div>
        )}

        {rec && searchResults.length === 0 && (
          <div className="scrollbar scrollbar-primary">
            <Recommendations
              chooseTrack={chooseTrack}
              handleQueue={handleQueue}
            />
          </div>
        )}

        {topSongs && searchResults.length === 0 && (
          <div className="scrollbar scrollbar-primary">
            <TopSongs chooseTrack={chooseTrack} />
          </div>
        )}

        {topArtists && searchResults.length === 0 && (
          <div className="scrollbar scrollbar-primary">
            <TopArtists chooseTrack={chooseTrack} />
          </div>
        )}

        {playlists && searchResults.length === 0 && (
          <div className="scrollbar scrollbar-primary">
            <Playlists chooseTrack={chooseTrack} />
          </div>
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
            !topArtists &&
            !playlists &&
            player && (
              <div
                style={{
                  whiteSpace: "pre",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {/* className="text-center" style={{ whiteSpace: "pre" }}*/}
                {lyrics}
              </div>
            )}
        </div>

        <div>
          {/* <FontAwesomeIcon icon="fa-shuffle" size="lg" inverse /> */}
          {/* style={{ width: "max-width" , left: "0" , right: "0" , position: "sticky" }} */}
          <FontAwesomeIcon
            icon="fa-solid fa-up-right-and-down-left-from-center"
            inverse
            onClick={handlePlayer}
            style={{ cursor: "pointer", float: "right" }}
          />

          <Player
            accessToken={accessToken}
            trackUri={playingTrack?.uri}
            trackURIs={trackURIs}
            playingTrack={playingTrack}
            setTrackURIs={setTrackURIs}
            queue={queue}
            setQueue={setQueue}
            setPlayingTrack={setPlayingTrack}
          />

          {/* <PlayerTest accessToken={accessToken} /> */}
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
