import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import React, { useCallback } from "react";

export default function Player(props) {
  const AUTH_TOKEN = props.accessToken;
  console.log(props.accessToken);
  const getOAuthToken = useCallback(callback => callback(AUTH_TOKEN), []);

  return (
    <WebPlaybackSDK
      deviceName="My awesome Spotify app"
      getOAuthToken={getOAuthToken}
      volume={0.5}
      connectOnInitialized={true}>
    </WebPlaybackSDK>
  );
};