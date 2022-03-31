import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //currentUser: Auth.getCurrentUser(),
      track: this.props.track,
    };
    //this.handlePlay=this.handlePlay.bind(this);
  }

//    handlePlay() {
//     this.props.chooseTrack(this.props.track)
//   }
  
  render() {
    return (      
      <Container
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      //onClick={this.handlePlay}
    >
      <img src={this.props.track.albumUrl} style={{ height: "64px", width: "64px" }} alt="albumUrl" />
      <div className="ml-3">
        <div>{this.props.track.title}</div>
        <div className="text-muted">{this.props.track.artist}</div> 
      </div>
    </Container>
    );
  }
}