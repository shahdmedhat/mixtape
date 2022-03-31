//import Login from "./Login";
//import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Khaled from "./Khaled";
import TopSongs from "./TopSongs";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Khaled code={code} />} />
        <Route path="/top" element={<TopSongs />} />
        
      </Routes>
    </Router>
  );

  // code ? <Dashboard code={code} /> : <Login />
}

export default App;
