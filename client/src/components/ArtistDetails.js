import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class ArtistDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: this.props.artist,
    };
  }
  
  render() {
    return (      
      <Container
      className="d-flex m-2 align-items-center"
      // style={{ cursor: "pointer" }}
    >
      <img src={this.props.artist.artistUrl} style={{ height: "64px", width: "64px" }} alt="artistUrl" />
      <div className="ml-3">
        <div>{this.props.artist.name}</div>
      </div>
    </Container>
    );
  }
}