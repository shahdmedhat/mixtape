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
  Modal,
  Accordion,
  Col,
} from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
//import Scrollbar from "./Scrollbar.jsx";
import "../css/Scrollbar.css";

import MusicBot from "./MusicBot";

import Likes from "./Likes";
import Recommendations from "./Recommendations";
import TopSongs from "./TopSongs";
import TopArtists from "./TopArtists";
import ArtistProfile from "./ArtistProfile";
import Playlists from "./Playlists";
import TrackDetails from "./TrackDetails";
import AlbumDetails from "./AlbumDetails";

import "../css/Dashboard.css";
import happyImage from "../images/happy.jpg";
import calmImage from "../images/calm.jpg";
import sadImage from "../images/sad.jpg";
import newImage from "../images/new.png";
import mixtapeImage from "../images/mixtape.jpg";
import taste from "../images/taste.jpg";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation } from "react-router-dom"; //---------------
import SpotifyPlayer from "react-spotify-web-playback";

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

  const [happy, setHappy] = useState([]);
  const [happyList, setHappyList] = useState([]);

  const [acoustic, setAcoustic] = useState([]);
  const [acousticList, setAcousticList] = useState([]);

  const [sad, setSad] = useState([]);
  const [sadList, setSadList] = useState([]);

  const [trackURIs, setTrackURIs] = useState([]);
  const [queue, setQueue] = useState([]);

  const [displayMessage, setDisplayMessage] = useState("");

  const [player, showPlayer] = useState(false);
  const [view, setView] = useState("");

  const [firstColor, setFirstColor] = useState("#41295a");
  const [secondColor, setSecondColor] = useState("#2F0743");

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playlistsInfo, setPlaylistsInfo] = useState([]); //get all playlists to show in modal

  const [trackToAddToPlaylist, setTrackToAddToPlaylist] = useState({});

  const [play, setPlay] = useState(false);
  const [uri, setUri] = useState([]);

  const [playerModal, showPlayerModal] = useState(false);
  const [message, setMessage] = useState("");

  const [newPlaylistName, setNewPlaylistName] = useState("");

  const [activity, setActivity] = useState("");
  const [queueModal, showQueueModal] = useState(false);

  const [accordionOpened, setAccordionOpened] = useState(false);
  const [username, setUsername] = useState("");

  const [artist, setArtist] = useState("");

  //NEW RELEASES
  const [newReleases, setNewReleases] = useState([]);
  const [newReleasesList, setNewReleasesList] = useState(""); //([]);
  const [albumTracks, setAlbumTracks] = useState([]);

  const [discoverWeekly, setDiscoverWeekly] = useState([]);
  const [discoverDaily, setDiscoverDaily] = useState([]);

  useEffect(() => {
    //if(queue.length===0){ //showNext
    setUri([playingTrack?.uri]);
    //}

    //setPlay(true);

    setTimeout(() => {
      setPlay(true);
    }, 1000);

    playingTrack ? console.log(playingTrack) : console.log("");

    //setQueue([]); //????????
  }, [playingTrack]);

  useEffect(() => {
    if (queue.length > 0) setPlay(!play);
  }, [uri]);

  function handlePlayer() {
    showPlayerModal(true);
    // if (player) {
    //   showPlayer(false);
    //   switch (view) {
    //     case "likes":
    //       setLikes(true);
    //       break;
    //     case "rec":
    //       setRec(true);
    //       break;
    //     case "artists":
    //       setTopArtists(true);
    //       break;
    //     case "tracks":
    //       setTopSongs(true);
    //       break;
    //     case "playlists":
    //       setPlaylists(true);
    //       break;
    //     case "happy":
    //       showHappy(true);
    //       break;
    //     case "sad":
    //       showSad(true);
    //       break;
    //     case "acoustic":
    //       showAcoustic(true);
    //       break;
    //   }

    //   setFirstColor("#FFFFFF");
    //   setSecondColor("#FFFFFF");
    // } else {
    //   //expand
    //   showPlayer(true);
    //   setLikes(false);
    //   setRec(false);
    //   setTopSongs(false);
    //   setTopArtists(false);
    //   setPlaylists(false);
    //   showHappy(false);
    //   showAcoustic(false);
    //   showSad(false);

    //   setFirstColor("#dc2424");
    //   setSecondColor("#4a569d");
    // }
  }

  function currentTime() {
    var today = new Date();
    var time = today.toLocaleTimeString();
    //console.log(time);

    if (time.split(" ")[1] === "AM") {
      if (
        parseInt(time.split(" ")[0].split(":")[0]) >= 6 &&
        parseInt(time.split(" ")[0].split(":")[0]) < 12
      ) {
        setDisplayMessage("Good Morning");
      } else {
        setDisplayMessage("Good Evening");
      }
    } else {
      //PM
      if (parseInt(time.split(" ")[0].split(":")[0]) >= 6) {
        setDisplayMessage("Good Evening");
      } else {
        setDisplayMessage("Good Afternoon");
      }
    }
  }

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  function handleQueue(track, q) {
    // var list = [...trackURIs];
    // list.push(track.uri);
    // setTrackURIs(list);

    // console.log(list);
    console.log(q);
    let listx = q;
    // for (var k in queue) {
    //   listx.push(queue[k]);
    // }

    console.log("before: ", listx);
    listx.push(track);
    console.log("after: ", listx);

    // setQueue([...q].push(track));

    setQueue(listx);
    console.log("SONG ADDED TO QUEUE");

    //console.log(queue);
    setMessage("ADDED TO QUEUE");
  }

  useEffect(() => {
    console.log("QUEUE:", queue);
  }, [queue]);

  function showQueue() {
    showQueueModal(true);
    //console.log(queue)
  }

  function addToPlaylist(id) {
    //console.log(trackToAddToPlaylist);
    spotifyApi.addTracksToPlaylist(id, [trackToAddToPlaylist.uri]).then(
      function(data) {
        console.log("Added tracks to playlist!");
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );

    setShowModal(false);
    setShowToast(true);
    setMessage("ADDED TO PLAYLIST");
  }

  function createPlaylist(name) {
    spotifyApi.createPlaylist(name, { public: true }).then(
      function(data) {
        spotifyApi
          .uploadCustomPlaylistCoverImage(
            data.body.id,
            trackToAddToPlaylist.albumUrl
          )
          .then(
            function(data) {
              console.log("Playlsit cover image uploaded!");
            },
            function(err) {
              console.log("Something went wrong!", err);
            }
          );

        spotifyApi
          .addTracksToPlaylist(data.body.id, [trackToAddToPlaylist.uri])
          .then(
            function(data) {
              console.log("Added tracks to playlist!");
            },
            function(err) {
              console.log("Something went wrong!", err);
            }
          );

        console.log("Created playlist!");
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );

    setShowModal(false);
    setShowToast(true);
    setMessage("PLAYLIST CREATED");
  }

  function addTrackToPlaylist(track) {
    //console.log(track);
    setTrackToAddToPlaylist(track);
  }

  function addToLikes(id) {
    spotifyApi.addToMySavedTracks([id]).then(
      function(data) {
        console.log("Added track!");
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );

    setShowToast(true);
    setMessage("ADDED TO LIKES");
  }

  function removeFromLikes(id) {
    spotifyApi.removeFromMySavedTracks([id]).then(
      function(data) {
        console.log("Removed!");
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );

    setShowToast(true);
    setMessage("REMOVED FROM LIKES");
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
      function(data) {
        //PLAYING IN PRIVATE USING PLAYER OBJECTTTTTT
        if (data.body && data.body.is_playing) {
          console.log("User is currently playing something!");
          spotifyApi.getMyCurrentPlayingTrack().then(
            function(data) {
              console.log("Now playing: " + data.body.item.name);
            },
            function(err) {
              console.log("Something went wrong!", err);
            }
          );
        } else {
          console.log("User is not playing anything, or doing so in private.");
        }
      },
      function(err) {
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

    //   spotifyApi.getCategories({
    //     limit : 5,
    //     offset: 0,
    //     country: 'US',
    //     locale: 'sv_US'
    // })
    // .then(function(data) {
    //   console.log(data.body);
    // }, function(err) {
    //   console.log("Something went wrong!", err);
    // });

    // spotifyApi
    //   .getRecommendations({ seed_genres: "happy,dance" })
    //   .then((res) => {
    //     //console.log(res.body);
    //     setHappy(
    //       res.body.tracks.map((track) => {
    //         const isLiked = spotifyApi
    //           .containsMySavedTracks([track.uri.split(":")[2]])
    //           .then(
    //             function (data) {
    //               var trackIsInYourMusic = data.body[0];
    //               if (trackIsInYourMusic) {
    //                 return true;
    //               } else {
    //                 return false;
    //               }
    //             },
    //             function (err) {
    //               console.log("Something went wrong!", err);
    //             }
    //           );

    //         const isLiked = new Promise((resolve, reject) => {
    //           return "foo";
    //         });

    //         const smallestAlbumImage = track.album.images.reduce(
    //           (smallest, image) => {
    //             if (image.height < smallest.height) return image;
    //             return smallest;
    //           },
    //           track.album.images[0] //loop through images, if current.size < smallest -> update smallest
    //         );

    //         const largestAlbumImage = track.album.images.reduce(
    //           (largest, image) => {
    //             if (image.height > largest.height) return image;
    //             return largest;
    //           },
    //           track.album.images[0]
    //         );

    //         return {
    //           artist: track.artists[0].name,
    //           title: track.name,
    //           uri: track.uri,
    //           albumUrl: smallestAlbumImage.url,
    //           isLiked: isLiked,
    //           image: largestAlbumImage.url,
    //         };
    //       })
    //     );
    //   });

    // spotifyApi
    //   .getRecommendations({
    //     seed_tracks:
    //       "0YRYs1HSkie0eZ02ON4euX,4MzySNjSdv9ZegSD13IVNV,0ElpbbncWT9aS7mgoqEHbQ",
    //     seed_genres: "acoustic,chill",
    //   })
    //   .then((res) => {
    //     //console.log(res.body);
    //     setAcoustic(
    //       res.body.tracks.map((track) => {
    //         const isLiked = spotifyApi
    //           .containsMySavedTracks([track.uri.split(":")[2]])
    //           .then(
    //             function (data) {
    //               var trackIsInYourMusic = data.body[0];
    //               if (trackIsInYourMusic) {
    //                 return true;
    //               } else {
    //                 return false;
    //               }
    //             },
    //             function (err) {
    //               console.log("Something went wrong!", err);
    //             }
    //           );

    //         const isLiked = new Promise((resolve, reject) => {
    //           return "foo";
    //         });

    //         const smallestAlbumImage = track.album.images.reduce(
    //           (smallest, image) => {
    //             if (image.height < smallest.height) return image;
    //             return smallest;
    //           },
    //           track.album.images[0] //loop through images, if current.size < smallest -> update smallest
    //         );

    //         const largestAlbumImage = track.album.images.reduce(
    //           (largest, image) => {
    //             if (image.height > largest.height) return image;
    //             return largest;
    //           },
    //           track.album.images[0]
    //         );
    //         return {
    //           artist: track.artists[0].name,
    //           title: track.name,
    //           uri: track.uri,
    //           albumUrl: smallestAlbumImage.url,
    //           isLiked: isLiked,
    //           image: largestAlbumImage.url,
    //         };
    //       })
    //     );
    //   });

    // spotifyApi
    //   .getRecommendations({
    //     seed_tracks:
    //       "7LVHVU3tWfcxj5aiPFEW4Q,35KiiILklye1JRRctaLUb4,6PypGyiu0Y2lCDBN1XZEnP",
    //     seed_genres: "sad,soul",
    //   })
    //   .then((res) => {
    //     //console.log(res.body);
    //     setSad(
    //       res.body.tracks.map((track) => {
    //         const isLiked = spotifyApi
    //           .containsMySavedTracks([track.uri.split(":")[2]])
    //           .then(
    //             function (data) {
    //               var trackIsInYourMusic = data.body[0];
    //               if (trackIsInYourMusic) {
    //                 return true;
    //               } else {
    //                 return false;
    //               }
    //             },
    //             function (err) {
    //               console.log("Something went wrong!", err);
    //             }
    //           );
    //         const smallestAlbumImage = track.album.images.reduce(
    //           (smallest, image) => {
    //             if (image.height < smallest.height) return image;
    //             return smallest;
    //           },
    //           track.album.images[0] //loop through images, if current.size < smallest -> update smallest
    //         );
    //         const largestAlbumImage = track.album.images.reduce(
    //           (largest, image) => {
    //             if (image.height > largest.height) return image;
    //             return largest;
    //           },
    //           track.album.images[0]
    //         );
    //         return {
    //           artist: track.artists[0].name,
    //           title: track.name,
    //           uri: track.uri,
    //           albumUrl: smallestAlbumImage.url,
    //           isLiked: isLiked,
    //           image: largestAlbumImage.url
    //         };
    //       })
    //     );
    //   });

    // setFirstColor("#FFFFFF");
    // setSecondColor("#FFFFFF");
    // setPlaylists(true);

    spotifyApi.getUserPlaylists().then((res) => {
      //add to playlist
      setPlaylistsInfo(
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

    spotifyApi.getMe().then(
      function(data) {
        setUsername(data.body.display_name);
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );

    spotifyApi.getNewReleases({ offset: 0, country: "US" }).then((res) => {
      console.log(res.body);
      setNewReleases(
        res.body.albums.items.map((album) => {
          const smallestAlbumImage = album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            album.images[0] //loop through images, if current.size < smallest -> update smallest
          );

          const largestAlbumImage = album.images.reduce((largest, image) => {
            if (image.height > largest.height) return image;
            return largest;
          }, album.images[0]);

          return {
            artist: album.artists[0].name,
            title: album.name,
            uri: album.uri,
            albumUrl: smallestAlbumImage.url,
            image: largestAlbumImage.url,
            id: album.id,
          };
        })
      );
    });


    spotifyApi.searchPlaylists("Discover Weekly").then((p) => {
      console.log(p.body);

      spotifyApi.getPlaylist(p.body.playlists.items[0].id).then((res) => {
        setDiscoverWeekly(
          res.body.tracks.items.map((item) => {
            // const isLiked = spotifyApi
            //   .containsMySavedTracks([track.uri.split(":")[2]])
            //   .then(
            //     function (data) {
            //       var trackIsInYourMusic = data.body[0];
            //       if (trackIsInYourMusic) {
            //         return true;
            //       } else {
            //         return false;
            //       }
            //     },
            //     function (err) {
            //       console.log("Something went wrong!", err);
            //     }
            //   );

            const isLiked = new Promise((resolve, reject) => {
              return "foo";
            });

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
    });
    
    spotifyApi.searchPlaylists("Release Radar").then((p) => {
      console.log(p.body);

      spotifyApi.getPlaylist(p.body.playlists.items[0].id).then((res) => {
        setDiscoverDaily(
          res.body.tracks.items.map((item) => {
            // const isLiked = spotifyApi
            //   .containsMySavedTracks([track.uri.split(":")[2]])
            //   .then(
            //     function (data) {
            //       var trackIsInYourMusic = data.body[0];
            //       if (trackIsInYourMusic) {
            //         return true;
            //       } else {
            //         return false;
            //       }
            //     },
            //     function (err) {
            //       console.log("Something went wrong!", err);
            //     }
            //   );

            const isLiked = new Promise((resolve, reject) => {
              return "foo";
            });

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
    });
    
  }, [accessToken]);

  useEffect(() => {
    setHappyList(
      happy.map((track) => (
        <TrackDetails
          track={track}
          key={track.uri}
          chooseTrack={chooseTrack}
          handleQueue={handleQueue}
          setShowToast={setShowToast}
          setShowModal={setShowModal}
          addTrackToPlaylist={addTrackToPlaylist}
          queue={queue}
          addToLikes={addToLikes}
          removeFromLikes={removeFromLikes}
        />
      ))
    );

    setAcousticList(
      acoustic.map((track) => (
        <TrackDetails
          track={track}
          key={track.uri}
          chooseTrack={chooseTrack}
          handleQueue={handleQueue}
          setShowToast={setShowToast}
          setShowModal={setShowModal}
          addTrackToPlaylist={addTrackToPlaylist}
          queue={queue}
          addToLikes={addToLikes}
          removeFromLikes={removeFromLikes}
        />
      ))
    );

    setSadList(
      sad.map((track) => (
        <TrackDetails
          track={track}
          key={track.uri}
          chooseTrack={chooseTrack}
          handleQueue={handleQueue}
          setShowToast={setShowToast}
          setShowModal={setShowModal}
          addTrackToPlaylist={addTrackToPlaylist}
          queue={queue}
          addToLikes={addToLikes}
          removeFromLikes={removeFromLikes}
        />
      ))
    );

    setNewReleasesList(
      newReleases.map((album) => (
        <AlbumDetails
          accessToken={accessToken}
          setView={setView}
          setAlbumTracks={setAlbumTracks}
          album={album}
          key={album.uri}
          chooseTrack={chooseTrack}
          handleQueue={handleQueue}
          setShowToast={setShowToast}
          setShowModal={setShowModal}
          addTrackToPlaylist={addTrackToPlaylist}
          queue={queue}
          addToLikes={addToLikes}
          removeFromLikes={removeFromLikes}
        />
      ))
    );
  }, [happy, acoustic, sad, newReleases]);

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
            image: largestAlbumImage.url,
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
    <div>
      <div className="dashboard">
        {/* <Scrollbar/> */}

        {/* //ADDED DIV */}
        {/* <div
          className="scrollbar scrollbar-lady-lips"
          style={{
            float: "right",
            justifyContent: "center",
            color: "white",
            width: "430px",
            height: "35vh",
            overflowY: "scroll",
            marginRight: "5px",
            border: "2px solid white",
            marginTop: "8px"
          }}
        >
          <Container className="d-flex flex-column py-2">
            {queue.length === 0 && (
              <h3 style={{ textAlign: "center", margin: "auto"}}> Queue is empty.</h3>
            )}
            
            {queue.length!==0 &&
            <div>
             <h3 style={{ textAlign: "center", margin: "auto"}}> Queue</h3>
             <br/>
            {queue.map((track) => (
              <TrackDetails
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
                handleQueue={handleQueue}
                setShowToast={setShowToast}
                setShowModal={setShowModal}
                addTrackToPlaylist={addTrackToPlaylist}
                queue={queue}
                addToLikes={addToLikes}
                removeFromLikes={removeFromLikes}
                showQueue={true}
              />
            ))}
            </div>
          }
          </Container>
        </div> */}

        <Sidebar
          accessToken={accessToken}
          showPlayer={showPlayer}
          setView={setView}
        />

        <Container
          className="d-flex flex-column py-2"
          style={{ height: "100vh", marginLeft: "275px" }} //ADDED WIDTH 50%?
        >
          <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "90%" }}
          />

          {/* <MusicBot setActivity={setActivity}/> */}

          <br />
          {showModal && (
            <Modal
              {...props}
              show={showModal}
              onHide={() => setShowModal(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add To Playlist
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* <h4>Centered Modal</h4> */}
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Create New Playlist</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter playlist name"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    onClick={() => {
                      createPlaylist(newPlaylistName);
                    }}
                  >
                    Create
                  </Button>
                </Form>
                <br /> <br />
                <Row>
                  {playlistsInfo.map((playlist) => (
                    <div style={{ borderRadius: "30px" }}>
                      <img
                        src={playlist.albumUrl}
                        style={{
                          height: "64px",
                          width: "64px",
                          //cursor: "pointer",
                        }}
                        alt="albumUrl"
                        //onClick={() => getPlaylistTracks(playlist.id, playlist.title)}
                      />

                      <div className="ml-3">
                        <div>{playlist.title}</div>
                      </div>

                      <div
                      // style={{ textAlign: "right", margin: "0px 0px 0px 10px" }}
                      >
                        <Button
                          variant="success"
                          onClick={() => {
                            addToPlaylist(playlist.id);
                          }}
                        >
                          Add To Playlist
                        </Button>
                      </div>
                      <br />
                    </div>
                  ))}
                </Row>
              </Modal.Body>
              {/* <Modal.Footer>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer> */}
            </Modal>
          )}

          {showToast && (
            <ToastContainer className="p-3" position={"middle-center"}>
              <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={2000}
                autohide
                bg={"dark"}
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
                <Toast.Body style={{ color: "white" }}>{message}</Toast.Body>
              </Toast>
            </ToastContainer>
          )}

          {/* <br /> */}

          {/* <Playlists chooseTrack={chooseTrack} accessToken={accessToken}/> */}

          {/* <h2>{displayMessage}</h2> */}
          {view === "" &&
            !player &&
            !accordionOpened &&
            username !== "" &&
            searchResults.length === 0 && (
              <div>
                <h2>
                  {displayMessage}, {username}
                </h2>
                <br/> <br/> <br/>
                {/* <h2>Based on your recent listening</h2> */}
                {/* <h2>Go beyond with music for moods.</h2> */}
                <h2>Discover New Music</h2>
                <Row>
                  {/* <Card
                    className="cardItem"
                    style={{
                      width: "18rem",
                      height: "24rem",
                      cursor: "pointer",
                      marginTop: "10px",
                      marginRight: "30px",
                    }}
                    onClick={() => {
                      setView("happy");
                    }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ marginTop: "20px" }}
                      src={happyImage}
                    />
                    <Card.Body>
                      <Card.Title style={{marginTop:"4px"}}>Daily Mix</Card.Title>
                      <Card.Text>
                      Hits that are guaranteed to boost your mood!
                    </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setView("happy");
                        }}
                      >
                        CHECK IT OUT
                      </Button>
                    </Card.Body>
                  </Card> */}

                  {/* <Card
                    className="cardItem"
                    style={{
                      width: "18rem",
                      height: "24rem",
                      cursor: "pointer",
                      marginTop: "10px",
                      marginRight: "30px",
                    }}
                    onClick={() => {
                      setView("acoustic");
                    }}
                  >
                    <Card.Img variant="top" style={{marginTop: "20px"}} src={calmImage} />
                    <Card.Body>
                      <Card.Title>Discover Weekly</Card.Title>
                      <Card.Text>
                      Keep calm with this mix of laidback tracks.
                    </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setView("acoustic");
                        }}
                      >
                        CHECK IT OUT
                      </Button>
                    </Card.Body>
                  </Card> */}

                  {/* <Card
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
                        setView("sad");
                      }}
                    >
                      CHECK IT OUT
                    </Button>
                  </Card.Body>
                </Card> */}

                  <Card
                    className="cardItem"
                    style={{
                      width: "18rem",
                      height: "24rem",
                      cursor: "pointer",
                      marginTop: "10px",
                      marginRight: "30px",
                      marginLeft: "10px"
                    }}
                    onClick={() => {
                      setView("discoverDaily");
                    }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ marginTop: "90px" }}
                      src={taste}
                    />
                    <Card.Body>
                      <Card.Title style={{marginTop:"17px"}}>Daily Mix</Card.Title>
                    </Card.Body>
                  </Card>
                  
                  <Card
                    className="cardItem"
                    style={{
                      width: "18rem",
                      height: "24rem",
                      cursor: "pointer",
                      marginTop: "10px",
                      marginRight: "30px",
                    }}
                    onClick={() => {
                      setView("newReleases");
                    }}
                  >
                    <Card.Img
                      style={{ marginTop: "90px" }}
                      variant="center"
                      src={newImage}
                    />
                    <br />
                    <Card.Body>
                      <Card.Title style={{marginTop:"17px"}}>New Releases</Card.Title>
                      {/* <Card.Text>
                      Keep calm with this mix of laidback tracks.
                    </Card.Text> */}
                      {/* <Button
                        variant="primary"
                        onClick={() => {
                          setView("newReleases");
                        }}
                      >
                        CHECK IT OUT
                      </Button> */}
                    </Card.Body>
                  </Card>

                  <Card
                    className="cardItem"
                    style={{
                      width: "18rem",
                      height: "24rem",
                      cursor: "pointer",
                      marginTop: "10px",
                      marginRight: "30px",
                    }}
                    onClick={() => {
                      setView("discoverWeekly");
                    }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ marginTop: "20px" }}
                      src={mixtapeImage}
                    />
                    <Card.Body>
                      <Card.Title>Your Weekly Mixtape</Card.Title>
                    </Card.Body>
                  </Card>
                </Row>
              </div>
            )}

          {view === "happy" && searchResults.length === 0 && (
            <div
              style={{
                overflowY: "scroll",
                justifyContent: "center",
                width: "90%",
              }}
            >
              <div
                style={{ font: "24px bold", color: "white", cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-left fa-inverse"
                  onClick={() => {
                    setView("");
                  }}
                />
              </div>
              <Container className="d-flex flex-column py-2">
                {/* <h1 style={{ textAlign: "center" }}>HAPPY MIX</h1> */}
                <div>{happyList}</div>
              </Container>
            </div>
          )}

          {view === "acoustic" && searchResults.length === 0 && (
            <div
              style={{
                overflowY: "scroll",
                justifyContent: "center",
                width: "90%",
              }}
            >
              <Container className="d-flex flex-column py-2">
                {/* <h1 style={{ textAlign: "center" }}>ACOUSTIC</h1> */}
                <div>{acousticList}</div>
              </Container>
            </div>
          )}

          {view === "sad" && searchResults.length === 0 && (
            <div style={{ overflowY: "scroll", justifyContent: "center" }}>
              <div
                style={{ font: "24px bold", color: "white", cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-left fa-inverse"
                  onClick={() => {
                    setView("");
                  }}
                />
              </div>
              <Container className="d-flex flex-column py-2">
                {/* <h1 style={{ textAlign: "center" }}>SAD</h1> */}
                <div>{sadList}</div>
              </Container>
            </div>
          )}

          {view === "newReleases" && searchResults.length === 0 && (
            <Row
              className="scrollbar scrollbar-lady-lips"
              style={{
                overflowY: "scroll",
                width: "90%",
                overflowY: "scroll",
                justifyContent: "center",
              }}
            >
              <div
                style={{ font: "24px bold", color: "white", cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-left fa-inverse"
                  onClick={() => {
                    setView("");
                  }}
                />
              </div>
              <h1 style={{ textAlign: "center", color: "white" }}>
                {" "}
                New Releases
              </h1>

              {newReleasesList}
            </Row>
          )}

          {view === "newReleasesDetails" && searchResults.length === 0 && (
            <div
              className="scrollbar scrollbar-lady-lips"
              style={{ width: "90%" }}
            >
              <div
                style={{ font: "24px bold", color: "white", cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-left fa-inverse"
                  onClick={() => {
                    setView("newReleases");
                  }}
                />
              </div>

              {albumTracks.map((track) => (
                <TrackDetails
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                  handleQueue={handleQueue}
                  setShowToast={setShowToast}
                  setShowModal={setShowModal}
                  addTrackToPlaylist={addTrackToPlaylist}
                  queue={queue}
                  addToLikes={addToLikes}
                  removeFromLikes={removeFromLikes}
                />
              ))}
            </div>
          )}

          {view === "discoverWeekly" && searchResults.length === 0 && (
              <div
                className="scrollbar scrollbar-lady-lips"
                style={{ width: "90%" }}
               >
              <div
                style={{ font: "24px bold", color: "white", cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-left fa-inverse"
                  onClick={() => {
                    setView("");
                  }}
                />
              </div>

              {discoverWeekly.map((track) => (
                <TrackDetails
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                  handleQueue={handleQueue}
                  setShowToast={setShowToast}
                  setShowModal={setShowModal}
                  addTrackToPlaylist={addTrackToPlaylist}
                  queue={queue}
                  addToLikes={addToLikes}
                  removeFromLikes={removeFromLikes}
                />
              ))}
            </div>
          )}
          
          {view === "discoverDaily" && searchResults.length === 0 && (
              <div
                className="scrollbar scrollbar-lady-lips"
                style={{ width: "90%" }}
               >
              <div
                style={{ font: "24px bold", color: "white", cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-left fa-inverse"
                  onClick={() => {
                    setView("");
                  }}
                />
              </div>

              {discoverDaily.map((track) => (
                <TrackDetails
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                  handleQueue={handleQueue}
                  setShowToast={setShowToast}
                  setShowModal={setShowModal}
                  addTrackToPlaylist={addTrackToPlaylist}
                  queue={queue}
                  addToLikes={addToLikes}
                  removeFromLikes={removeFromLikes}
                />
              ))}
            </div>
          )}

          {view === "likes" && searchResults.length === 0 && (
            <div
              className="scrollbar scrollbar-lady-lips"
              style={{ width: "90%" }}
            >
              <Likes
                chooseTrack={chooseTrack}
                setTrackURIs={setTrackURIs}
                handleQueue={handleQueue}
                setShowToast={setShowToast}
                setShowModal={setShowModal}
                addTrackToPlaylist={addTrackToPlaylist}
                queue={queue}
                addToLikes={addToLikes}
                removeFromLikes={removeFromLikes}
                setUri={setUri}
                setPlayingTrack={setPlayingTrack}
                setQueue={setQueue}
              />
            </div>
          )}

          {view === "rec" && searchResults.length === 0 && (
            <div
              className="scrollbar scrollbar-lady-lips"
              style={{ width: "90%" }}
            >
              <Recommendations
                chooseTrack={chooseTrack}
                handleQueue={handleQueue}
                setShowToast={setShowToast}
                setShowModal={setShowModal}
                addTrackToPlaylist={addTrackToPlaylist}
                queue={queue}
                addToLikes={addToLikes}
                removeFromLikes={removeFromLikes}
              />
            </div>
          )}

          {view === "topSongs" && searchResults.length === 0 && (
            <div
              className="scrollbar scrollbar-lady-lips"
              style={{ width: "90%" }}
            >
              <TopSongs
                chooseTrack={chooseTrack}
                handleQueue={handleQueue}
                setShowToast={setShowToast}
                setShowModal={setShowModal}
                addTrackToPlaylist={addTrackToPlaylist}
                queue={queue}
                addToLikes={addToLikes}
                removeFromLikes={removeFromLikes}
              />
            </div>
          )}

          {view === "artists" && searchResults.length === 0 && (
            <div
              className="scrollbar scrollbar-lady-lips"
              style={{ width: "90%" }}
            >
              <TopArtists
                chooseTrack={chooseTrack}
                setView={setView}
                setArtist={setArtist}
              />
            </div>
          )}

          {view === "artistProfile" && searchResults.length === 0 && (
            <div
              className="scrollbar scrollbar-lady-lips"
              style={{ width: "90%" }}
            >
              <ArtistProfile
                accessToken={accessToken}
                artist={artist}
                chooseTrack={chooseTrack}
                handleQueue={handleQueue}
                setShowToast={setShowToast}
                setShowModal={setShowModal}
                addTrackToPlaylist={addTrackToPlaylist}
                queue={queue}
                addToLikes={addToLikes}
                removeFromLikes={removeFromLikes}
              />
            </div>
          )}

          {view === "playlists" && searchResults.length === 0 && (
            <div
              className="scrollbar scrollbar-lady-lips"
              style={{ width: "90%" }}
            >
              <Playlists
                chooseTrack={chooseTrack}
                handleQueue={handleQueue}
                setShowToast={setShowToast}
                setShowModal={setShowModal}
                addTrackToPlaylist={addTrackToPlaylist}
                queue={queue}
                addToLikes={addToLikes}
                removeFromLikes={removeFromLikes}
              />
            </div>
          )}

          <div
            className="flex-grow-1 my-2 scrollbar scrollbar-lady-lips"
            style={{ overflowY: "auto", width: "90%" }} //scrollable
          >
            {searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>

          <div style={{ width: "90%" }}>
            {accessToken && (
              <SpotifyPlayer
                token={accessToken}
                showSaveIcon
                callback={(state) => {
                  //console.log(state.isPlaying);
                  if (!state.isPlaying && queue.length === 0) {
                    setPlay(false);
                    //console.log("DONE");
                  }

                  if (
                    !state.isPlaying &&
                    queue.length > 0 &&
                    state.progressMs === 0
                  ) {
                    console.log("AAAAAAAA");
                    var uris = [];
                    for (var k in queue) {
                      uris.push(queue[k].uri);
                    }

                    setUri(uris);
                    console.log(uris);
                    let first = queue.shift();
                    setPlayingTrack(first);

                    console.log(state.nextTracks);
                  }
                }}
                play={play}
                uris={uri}
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
              />
            )}

            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  onClick={() => {
                    setAccordionOpened(!accordionOpened);
                  }}
                >
                  {/* <Col>
              <Button
                variant="success"
                size="lg"
                onClick={() => {
                  handlePlayer();
                }}
              >
                Show Lyrics
              </Button>
            </Col> */}
                  <h5 style={{ color: "rgb(60, 62, 77)" }}>Lyrics</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    className="scrollbar scrollbar-lady-lips"
                    style={{
                      backgroundColor: "rgb(60, 62, 77)",
                      height: "660px",
                    }}
                  >
                    {queue.length !== 0 && (
                      <div style={{ float: "right" }}>
                        <br />
                        <Button
                          variant="success"
                          size="lg"
                          style={{ marginRight: "30px" }}
                          onClick={() => {
                            showQueue();
                          }}
                        >
                          Queue
                        </Button>
                      </div>
                    )}

                    <br />
                    <div style={{ textAlign: "center" }}>
                      {playingTrack && queue.length === 0 ? (
                        <img
                          src={playingTrack.image}
                          style={{ height: "230px", width: "230px" }}
                          alt="albumUrl"
                        />
                      ) : (
                        " "
                      )}

                      {playingTrack && queue.length !== 0 ? (
                        <img
                          src={playingTrack.image}
                          style={{
                            height: "230px",
                            width: "230px",
                            marginLeft: "145px",
                          }}
                          alt="albumUrl"
                        />
                      ) : (
                        " "
                      )}

                      {queue.length !== 0 && (
                        <FontAwesomeIcon
                          icon="fa-solid fa-forward"
                          size="lg"
                          style={{ cursor: "pointer", marginLeft: "30px" }}
                          inverse
                          onClick={() => {
                            if (queue.length === 0) {
                              console.log("Nothing to play...");
                            } else {
                              let next = queue.shift();
                              setPlayingTrack(next);
                            }
                          }}
                        />
                      )}
                    </div>

                    <br />

                    <div
                      style={{
                        whiteSpace: "pre",
                        color: "white",
                        textAlign: "center",
                        fontSize: "20px",
                        overflowY: "hidden",
                        // backgroundColor: "rgb(60, 62, 77)",
                      }}
                    >
                      {lyrics ? lyrics : "Nothing is being played yet."}

                      {queueModal && (
                        <Modal
                          show={queueModal}
                          size="lg"
                          onHide={() => showQueueModal(false)}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Queue</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {queue.length === 0 && (
                              <h3 style={{ textAlign: "center" }}>
                                {" "}
                                Queue is empty.
                              </h3>
                            )}

                            {queue.map((track) => (
                              <TrackDetails
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                                handleQueue={handleQueue}
                                setShowToast={setShowToast}
                                setShowModal={setShowModal}
                                addTrackToPlaylist={addTrackToPlaylist}
                                queue={queue}
                                addToLikes={addToLikes}
                                removeFromLikes={removeFromLikes}
                                showQueue={true}
                              />
                            ))}
                          </Modal.Body>
                        </Modal>
                      )}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          {playerModal && (
            <Modal
              show={playerModal}
              size="lg"
              onHide={() => showPlayerModal(false)}
              className="special_modal"
            >
              <Modal.Header closeButton closeVariant="white">
                <Modal.Title>LYRICS</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  className="scrollbar scrollbar-lady-lips"
                  style={{
                    whiteSpace: "pre",
                    color: "white",
                    textAlign: "center",
                    fontSize: "21px",
                    overflowY: "scroll",
                  }}
                >
                  {lyrics}
                </div>
              </Modal.Body>
            </Modal>
          )}
        </Container>
      </div>
    </div>
  );
}
