import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DashBoard } from './components/DashBoard';
import { Highlight } from './components/Highlight';
import { BookList } from './components/BookList';
import { Favorites } from './components/Favorites';
import { Menu } from './components/Menu';
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

  // ----- Update visibility with state
  updateVisibility(setVisibility) {
    this.setState({
      visibility: {
        highlight: setVisibility.highlight,
        booklist: setVisibility.booklist,
        favorites: setVisibility.favorites
      }
    });
  }

  render() {
    return (
      <div className="app">
        <DashBoard queryObject={this.updateQuery} />

        <Highlight data={this.state.visibility.favorites ?
          this.state.favorites[this.state.highlight] :
          this.state.items[this.state.highlight]}
          visibility={this.state.visibility}
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite} />

      </div>
    )
  }
}

export default App;
