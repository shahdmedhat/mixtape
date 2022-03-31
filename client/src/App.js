import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Khaled from "./Khaled";
import TopSongs from "./TopSongs";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  Routes,
} from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Khaled code={code} />} />
        <Route path="/top" component={TopSongs} />
        
      </Routes>
    </Router>
  );

  // code ? <Dashboard code={code} /> : <Login />
}

export default App;
