import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import ResultRecorder from "./pages/ResultRecorder";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rankings" component={Rankings} />
        <Route path="/profiles/:userId" component={Profile} />
        <Route path="/record-results" component={ResultRecorder} />
      </Switch>
    </BrowserRouter>
  );
}
