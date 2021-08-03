import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Graphs from "./Graph";
import Calender from './Calender'
import Contact from "./Contact";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <div className="header">
        <h1>Car Diagnosis</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/graphs">Diagnosis</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/graphs">
            <Graphs />
          </Route>
          <Route path="/calender">
            <Calender />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>

    </Router>
  );
}




