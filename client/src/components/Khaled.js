import React, { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";
import Token from "./Token";
import {Modal} from "react-bootstrap"

const code = new URLSearchParams(window.location.search).get("code");

export default function Khaled(props) {
  let location = useLocation();
  const [flag, setFlag] = useState(false);
  // var view = props.view;
  const [listener, setListener] = useState("");
  const [dash, setDash] = useState(false);

  useEffect(() => {
    //console.log(location.state);
    if (location.state !== null){
      setFlag(true);
    }
  }, [location.state]);
  
  useEffect(() => {
    console.log(listener);
  }, [listener]);
  
  //console.log(props.view)
  //const accessToken = location.state.accessToken;
  
  return code ? <Dashboard code={code} listener={listener} /> : <Login setListener={setListener} />;
  // return <Login code={code} setListener={setListener} />;

  // if (code && dash){
  //   return <Dashboard code={code} listener={listener} />;
  // }
  
  // else{
  //   return <Login setListener={setListener} setDash={setDash} />
  // }

}
