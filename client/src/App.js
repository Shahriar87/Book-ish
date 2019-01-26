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

  // ----- Updating the query based on query type selected
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


  // ----- Detail info about selected books
  updateHighlight(highlight) {
    this.setState({
      highlight: highlight.highlight,
      visibility: {
        highlight: true,
        booklist: true,
        favorites: false
      }
    });
  }

  addFavorite(data) {
    this.setState({
      items: this.state.items.filter((item, i) => i !== this.state.highlight),
      visibility: {
        highlight: false,
        booklist: false,
        favorites: true
      },
      favorites: [...this.state.favorites, data]
    });

    // ----- Adding Favourites
    axios.post('/api/favorites', data)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  removeFavorite(data) {
    const remove = this.state.favorites;
    remove.splice(this.state.highlight, 1);
    this.setState({
      visibility: {
        highlight: false,
        booklist: false,
        favorites: true
      },
      favorites: [...remove]
    });

    dbPromise.then(db => {
      let tx = db.transaction('favorites', 'readwrite');
      let favorites = tx.objectStore('favorites', 'readwrite');
      favorites.delete(data.title);
    }).catch(error => {
      console.error('IndexedDB:', error);
    })

    axios.delete(`/api/favorites/${data._id}`, data)
      .then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.error(err);
      })
  }

  componentDidMount() {
    // ----- Fetching favourites
    axios.get('/api/favorites')
      .then(response => {
        console.log('Fetched from mongo', response.data);
        this.setState({
          favorites: response.data
        })
      }).catch(err => {
        console.error(err);
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

        <Menu setVisibility={this.updateVisibility}
          visibility={this.state.visibility} />

      </div>
    )
  }
}

export default App;
