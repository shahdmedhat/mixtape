import React from "react";
import { Container } from "react-bootstrap";
import "../css/Login.css";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=f6f8e70042bb47cd9c82ef26e1cb83a7&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-read-private%20playlist-read-collaborative%20streaming%20user-read-email";

export default function Login() {
  return (
    <div className="music">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* <h1> Music for every mood.</h1> */}
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
          GET STARTED
        </a>
      </Container>
    </div>
  );
}
