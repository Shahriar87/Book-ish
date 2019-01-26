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

  // ----- Fetch query from Google API
  fetchQuery() {
    this.serverRequest = fetch('https://www.googleapis.com/books/v1/volumes?' + this.state.queryObject.type + this.state.queryObject.query)
      .then(response => response.json())
      .then((data) => {
        data.items.forEach((item, i) => {
          let element = {};
          if (typeof item.volumeInfo.title != 'undefined') {
            element.title = item.volumeInfo.title;
          } else {
            element.title = null;
          }
          if (typeof item.volumeInfo.authors != 'undefined') {
            element.authors = item.volumeInfo.authors[0];
          } else {
            element.authors = null;
          }
          if (typeof item.volumeInfo.averageRating != 'undefined') {
            element.rating = item.volumeInfo.averageRating;
          } else {
            element.rating = null;
          }
          if (typeof item.volumeInfo.ratingsCount != 'undefined') {
            element.ratingsCount = item.volumeInfo.ratingsCount;
          } else {
            element.ratingsCount = null;
          }
          if (typeof item.volumeInfo.publisher != 'undefined') {
            element.publisher = item.volumeInfo.publisher;
          } else {
            element.publisher = null;
          }
          if (typeof item.volumeInfo.publishedDate != 'undefined') {
            element.publishedDate = item.volumeInfo.publishedDate;
          } else {
            element.publishedDate = null;
          }
          if (typeof item.volumeInfo.description != 'undefined') {
            element.description = item.volumeInfo.description;
          } else {
            element.description = null;
          }
          if (typeof item.volumeInfo.imageLinks != 'undefined' &&
            typeof item.volumeInfo.imageLinks.thumbnail != 'undefined') {
            element.thumbnail = item.volumeInfo.imageLinks.thumbnail.replace(/http:/i, 'https:');

          } else {
            element.thumbnail = null;
          }
          if (typeof item.saleInfo.listPrice != 'undefined') {
            element.price = item.saleInfo.listPrice.amount;
          } else {
            element.price = null;
          }
          if (typeof item.saleInfo.buyLink != 'undefined') {
            element.purchase = item.saleInfo.buyLink;
          } else {
            element.price = null;
          }
          if (typeof item.volumeInfo.description != 'undefined') {
            element.description = item.volumeInfo.description;
          } else {
            element.description = null;
          }
          this.setState(this.state.items.splice(i, 1, element));
        })
      }).catch((err) => {
        console.error('There was an error fetching data', err);
      });
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

        <BookList data={this.state.items}
          highlight={this.updateHighlight}
          visibility={this.state.visibility.booklist} />
          
        <Menu setVisibility={this.updateVisibility}
          visibility={this.state.visibility} />

      </div>
    )
  }
}

export default App;
