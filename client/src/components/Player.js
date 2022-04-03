import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri]) //everytime we choose a different track

  if (!accessToken) return null
  //console.log(trackUri);
  
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: '#0f0',
        bgColor: '#333',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#fff',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        width: '60px'
      }}
    />
  )
}