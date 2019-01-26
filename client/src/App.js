import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DashBoard } from './components/DashBoard';
import { Highlight } from './components/Highlight';
import { BookList } from './components/BookList';
import { Favorites } from './components/Favorites';
import { Menu } from './components/Menu';
import idb from 'idb';
import axios from 'axios';


class App extends Component {










  render() {
    return (
      <div className="app">
        <DashBoard queryObject={this.updateQuery} />

      </div>
    )
  }
}

export default App;
