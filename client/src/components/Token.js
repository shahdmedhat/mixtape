import React, { useState } from "react";
import useAuth from "./useAuth";
import Dashboard from "./Dashboard";
import { useNavigate } from 'react-router-dom';

import "../css/Login.css";

import { Modal, Button } from "react-bootstrap";
export default function Token(props) {
  const [showModal, setShowModal] = useState(true);
  const [listener, setListener] = useState("");
  let navigate = useNavigate();

  // const accessToken = useAuth(props.code);
  // console.log(accessToken);
  return (
    
    <div>
      <div>
        <Button
          backdrop="static"
          onClick={() => {
            setShowModal(true);
          }}
        >
          GET STARTED
        </Button>
      </div> 
        
        {showModal &&
        <Modal
          show={showModal}
          size="lg"
          onHide={() => setShowModal(false)}
          
          aria-labelledby="contained-modal-title-vcenter"
          centered
          // className="special_modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Welcome to Spotify 2.0</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Be honest, are you here because you're procrastinating doing something?
          </Modal.Body>
          
          <Modal.Footer>
          <Button variant="primary" onClick={()=> {
            setListener("active");
            navigate("/dashboard", {code: props.code})}}>
            No, just here to listen
          </Button>
          <Button variant="danger" onClick={()=> {setListener("passive")}}>Guilty</Button>
        </Modal.Footer>
          
        </Modal>
      }
     </div>
    // <Dashboard accessToken={accessToken}/>
  );
}
