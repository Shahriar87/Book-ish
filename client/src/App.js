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

  constructor(props) {
    super(props)
    this.state = {
      items: [
        null
      ],
      queryObject: {
        type: 'q=intitle:',
        query: 'harry+potter'
      },
      highlight: 0,
      visibility: {
        highlight: false,
        booklist: false,
        favorites: false
      },
      favorites: [
        null
      ]
    }
    this.updateQuery = this.updateQuery.bind(this);

  }

  // Set the current query in state on change
  updateQuery(queryObject) {
    this.setState({
      queryObject: {
        type: queryObject.type,
        query: queryObject.query
      },
      visibility: {
        highlight: false,
        booklist: true,
        favorites: false
      }
    }, () => {
      this.fetchQuery();
    });

  }

  render() {
    return (
      <div className="app">
        <DashBoard queryObject={this.updateQuery} />


      </div>
    )
  }
}

export default App;
