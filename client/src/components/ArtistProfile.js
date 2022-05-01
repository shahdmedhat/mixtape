import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row } from "react-bootstrap";
import TrackDetails from "./TrackDetails";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default function ArtistProfile(props) {
  const accessToken = props.accessToken;
  const [tracks, setTracks] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    console.log(props.artist);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    // spotifyApi.getArtistAlbums(props.artist.id).then(
    //   function(data) {
    //     console.log('Artist albums', data.body);
    //   },
    //   function(err) {
    //     console.error(err);
    //   }
    // );

    spotifyApi.getArtistTopTracks(props.artist.id, "US").then((res) => {
      setTracks(
        res.body.tracks.map((track) => {
          const isLiked = spotifyApi
            .containsMySavedTracks([track.uri.split(":")[2]])
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

          const smallestAlbumImage = track.album.images.reduce(
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
            isLiked: isLiked,
            image: largestAlbumImage.url,
          };
        })
      );
    });
  }, [accessToken]);

  useEffect(() => {
    setList(
      tracks.map((track) => (
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
  }, [tracks]);

  return (
    <Row style={{width:"100%", overflowY: "scroll", justifyContent: "center", overflow:'hidden'}}>
      <Card className="text-center" style={{ width: "18rem",height: "26rem" , paddingTop: "50px",position:"relative", marginTop:"70px" }}>
        <Card.Img style={{maxHeight: "275px"}} variant="center" src={props.artist.image} />
        <Card.Body>
          <Card.Title>{props.artist.name}</Card.Title>
          <Card.Text>{props.artist.followers} Followers</Card.Text>
          {/* <Button
        variant="primary"
        onClick={() => {
        }}
      >
        Follow
      </Button> */}
        </Card.Body>
      </Card>

      <div
        style={{
          // overflowY: "scroll",
          width: "70%",
          float: "right"
        }}
      >
        <Container className="d-flex flex-column py-2">
          <h1 style={{ textAlign: "center", color: "white" }}> Popular Songs</h1>
          <div>{list}</div>
        </Container>
      </div>
    </Row>
  );
}
