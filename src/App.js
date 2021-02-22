import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home.js";
import Chat from "./pages/Chat.js";
import Profile from "./pages/Profile.js";
import Footer from "./components/Footer";
import Favs from "./pages/Favs.js";
import AddItem from "./pages/AddItem.js";
import Page404 from "./pages/Page404.js";
import Login from "./pages/Login.js";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/favs" component={Favs} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/add" component={AddItem} />

          <Route component={Page404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
