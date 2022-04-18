import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({
  setPlayingTrack,
  setQueue,
  queue,
  playingTrack,
  accessToken,
  trackUri,
  trackURIs,
}) {

  const [play, setPlay] = useState(false);
  const [uri, setUri] = useState([]);
  //const [flag, setFlag] = useState(false);
  // useEffect(() => setPlay(true), [trackUri]); //everytime we choose a different track --[trackUri]

  useEffect(() => {
    // console.log("CURRENTLY PLAYING: ",trackUri);
    // console.log("QUEUE: ",trackURIs);
    //console.log(playingTrack);

    // if(trackURIs.length > 0){
    //   console.log("THERE IS A QUEUE");
    //   var list=[...trackURIs];
    //   if (list[0]=== undefined){
    //     list[0]=playingTrack.uri;
    //   }
    //   setUri(list);
    // }
    // else{
    //   if(trackUri){
    //     setUri([trackUri])
    //     console.log("SONG PLAYING BUT NO QUEUE")
    //   }
    //   else{
    //     setUri([])
    //     console.log("NOTHING BEING PLAYED")
    //   }
    // }
    console.log(trackUri);
  }, [trackURIs]);

  useEffect(() => {
    console.log(trackUri);
    setUri([trackUri]);
    setTimeout(() => {
      setPlay(true);
    }, 2000);
    //setQueue([]); //not necessary?
  }, [trackUri]);

  // useEffect(() => {
  //   console.log("AAAAAA");
  //   setUri(queue)
  // }, [flag]);

  useEffect(() => {
    // console.log("URI CHANGED");
    // console.log(queue);
    // setPlay(false);
    // setPlay(true);
      setPlay(!play);
  }, [uri]);

  if (!accessToken) return null;
  // console.log(trackUri);

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        //console.log(state.isPlaying);
        if (!state.isPlaying && queue.length === 0) {
          setPlay(false);
          //console.log("DONE");
        }

        if (!state.isPlaying && queue.length > 0 && state.progressMs === 0) {
          //setPlay(false);
          // var uris = [];
          // for (var k in queue) {
          //   uris.push(queue[k].uri);
          // }
          // setUri(Array.from(queue));

          setUri(queue);

          let first = queue.shift();
          setPlayingTrack(first);
          
        }

        //console.log(state.progressMs);
        //setPlay(true);
        // console.log("ELSEEEE");

        // if (!state.isPlaying) setUri(queue);
        //state.nextTracks=["spotify:track:5pSSEkT0963muzzIjsVkrs","spotify:track:2iA9swOmMhBUFdbflno6GE"]
      }}
      play={play}
      uris={uri}
      styles={{
        activeColor: "#0f0",
        bgColor: "#333",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#fff",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
        height: "60px",
      }}
    />
  );
}
