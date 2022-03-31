import React, { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code");

export default function Khaled(props) {
  let location = useLocation();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    //console.log(location.state);
    if (location.state !== null){
      setFlag(true);
    }
  }, [location.state]);
  
  //const accessToken = location.state.accessToken;
  return code ? <Dashboard code={code} /> : <Login />;
}
