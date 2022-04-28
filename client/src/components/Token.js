import React from 'react'
import useAuth from "./useAuth";
import Dashboard from "./Dashboard";

export default function Token(props) {
  const accessToken = useAuth(props.code);
  console.log(accessToken);
  return (
    <Dashboard accessToken={accessToken}/>
  )
}
