//import Login from "./Login";
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Khaled from "./Khaled";
import TopSongs from "./TopSongs";
import Likes from "./Likes";
import Playlists from "./Playlists";
import TopArtists from "./TopArtists";
import Recommendations from "./Recommendations";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code");
// var view = "";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Khaled code={code} />} />
        <Route path="/top" element={<TopSongs/>} />
        <Route path="/likes" element={<Likes/>} />
        <Route path="/playlists" element={<Playlists/>} />
        <Route path="/artists" element={<TopArtists/>} />
        <Route path="/discover" element={<Recommendations/>} />
        <Route exact path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );

  // code ? <Dashboard code={code} /> : <Login />
}

export default App;
