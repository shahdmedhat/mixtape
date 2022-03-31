import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

export default function Khaled(props) {
  return code ? <Dashboard code={code} /> : <Login />;
}
