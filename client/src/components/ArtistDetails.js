import React, { Component } from "react";
import { Container,Card } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Likes from "./Likes";
import "../css/TrackDetails.css";

const spotifyApi = new SpotifyWebApi({
  clientId: "f6f8e70042bb47cd9c82ef26e1cb83a7",
});

export default class ArtistDetails extends Component {
  constructor(props) {
    super(props);
    spotifyApi.setAccessToken(this.props.accessToken);
    this.state = {
      artist: this.props.artist,
    };
    this.showArtist=this.showArtist.bind(this);
  }
  
  showArtist(id){
    spotifyApi.getArtistAlbums(id,{ limit: 10, offset: 20 },
      function(err, data) {
        if (err) {
          console.error('Something went wrong!');
        } else {
          console.log(data.body);
        }
      }
    );
    
    this.props.setView("artistProfile");
    this.props.setArtist(this.props.artist);
  }
  
  render() {
    return (  
    
    //   <Card className="text-center" style={{ width: "16rem", textAlign: "center" }}>
    //     <Card.Img variant="center" src={this.props.artist.image} />
    //     <Card.Body>
    //      <Card.Title>{this.props.artist.name}</Card.Title>
    //     </Card.Body>
    //  </Card>
      
      
    <div className="songRow">
    <Container className="d-flex m-2 align-items-center" style={{cursor: "pointer"}} onClick={()=> this.showArtist(this.props.artist.uri.split(":")[2])}>
      <img
        src={this.props.artist.artistUrl}
        className="songRow__album"
        alt="albumUrl"
      />

      <div className="songRow__info">
        <h1>{this.props.artist.name}</h1>
      </div>

    </Container>
  </div>
      
      
    //   <Container className="d-flex m-2 align-items-center" style={{ justifyContent: "flex-start"}}>
    //   <img src={this.props.artist.artistUrl} style={{ height: "64px", width: "64px" }} alt="artistUrl" />
    //   <div className="ml-3" style={{marginLeft: "10px",cursor: "pointer" }} onClick={() => this.showArtist(this.props.artist.uri.split(":")[2])}>
    //     <div style={{font: "35px"}}>{this.props.artist.name}</div>
    //   </div>
    // </Container>
    
    );
  }
}