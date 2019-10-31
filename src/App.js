import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch';
import BookList from './BookList';
import './App.css'
import {Route} from 'react-router-dom'
import {debounce} from 'throttle-debounce';

class App extends React.Component {
  // bookshelves = ['Currently Reading', 'Want to Read', 'Have Read'];
  bookshelves = [
    {
      key: 'currentlyReading',
      name: 'Currently Reading'
    }, {
      key: 'wantToRead',
      name: 'Want to Read'
    }, {
      key: 'read',
      name: 'Have Read'
    }
  ];

  constructor(props) {
    super(props)

    this.state = {
      books: [],
      searchResult: []
    }

    this.onMoveShelf = (book, shelfName) => {
      BooksAPI.update(book, shelfName)
      let updatedBooks = this
        .state
        .books
        .filter(b => b.id !== book.id);
      book.shelf = shelfName;
      if (shelfName !== 'none') {
        updatedBooks.push(book)
      }
      this.setState({books: updatedBooks})
    }

  this.clearSearch = () => {
    this.setState({searchResult: []})
  }

  this.onSearch = debounce(300, false, query => {
    if (query.length > 0) {
      BooksAPI
        .search(query)
        .then(searchResponse => {
          if (searchResponse.error) {
            this.clearSearch()
          } else {
            this.setState({searchResult: searchResponse})
          }
        })
    } else {
      this.clearSearch()
    }

  })
}

componentDidMount = () => {
  BooksAPI
    .getAll()
    .then(books => {
      this.setState({books: books});
    });
};

/* cSpell:disable */

render() {
  return (
    <div className="app">
      <Route
        path="/search"
        render={() => (<BookSearch
        bookshelves={this.bookshelves}
        books={this.state.books}
        onSearch={this.onSearch}
        searchResult={this.state.searchResult}
        moveShelf={this.onMoveShelf}
        clearSearch={this.clearSearch}/>)}/>
      <Route
        exact
        path="/"
        render={() => (<BookList
        bookshelves={this.bookshelves}
        books={this.state.books}
        moveShelf={this.onMoveShelf}/>)}/>
    </div>
  )
}
}

export default App
