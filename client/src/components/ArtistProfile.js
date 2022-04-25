import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
    clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
  });
  
export default function ArtistProfile(props) {
    const accessToken=props.accessToken;
    
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
      }, [accessToken]);
      
  return (
    <div>ArtistProfile</div>
  )
}
