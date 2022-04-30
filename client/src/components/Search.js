import React from "react";
import { Form, Card, Row } from "react-bootstrap";
import happyImage from "../images/happy.jpg";
import sadImage from "../images/sad.jpg";

export default function Search(props) {
  return (
    <div>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        style={{ width: "90%" }}
      />
      <br /> <br />
      
      {props.length ===0 &&
      <div>
      <h2>Mood Playlists</h2>
      <Row
        className="scrollbar scrollbar-lady-lips"
        style={{
          width: "79%",
          flexWrap: "nowrap",
          overflowY: "hidden",
        }}
      >
        <Card
          className="cardItem"
          style={{
            width: "18rem",
            height: "26rem",
            cursor: "pointer",
            marginTop: "10px",
            marginRight: "30px",
          }}
          onClick={() => {
            props.setView("happy");
          }}
        >
          <Card.Img
            variant="top"
            style={{ marginTop: "20px" }}
            src={happyImage}
          />
          <Card.Body>
            <Card.Title style={{ marginTop: "4px" }}>Daily Mix</Card.Title>
            <Card.Text>Hits that are guaranteed to boost your mood!</Card.Text>
          </Card.Body>
        </Card>

        <Card
          className="cardItem"
          style={{
            width: "18rem",
            height: "26rem",
            cursor: "pointer",
            marginTop: "10px",
            marginRight: "30px",
          }}
          onClick={() => {
            props.setView("sad");
          }}
        >
          <Card.Img style={{marginTop: "50px"}} variant="center" src={sadImage} />
          <Card.Body>
            {/* <br />  */}
            <br />
            <Card.Title>Sad</Card.Title>
            <Card.Text>Some tracks to let it all out...</Card.Text>
            
          </Card.Body>
        </Card>
      </Row>
      </div>
    }
    </div>
  );
}
