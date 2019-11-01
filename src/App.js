import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch';
import BookList from './BookList';
import './App.css'
import { Route } from 'react-router-dom'
import { debounce } from 'throttle-debounce';

const  bookshelves = [
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

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      books: [],
      searchResult: [],
      error: false
    }

    this.onMoveShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
      if (shelf === 'none') {
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id)
        }));
      } else {
        book.shelf = shelf;
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat(book)
        }));
      }
    };

    this.clearSearch = () => {
      this.setState({ searchResult: [] })
    }

    this.onSearch = debounce(300, false, query => {
      if (query.length > 0) {
        BooksAPI
          .search(query)
          .then(searchResponse => {
            if (searchResponse.error) {
              this.clearSearch()
            } else {
              debugger
              this.setState({ searchResult: searchResponse })
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
        this.setState({ books: books });
      }).catch(err => {
        console.log(err);
        this.setState({ error: true });
      });;
  };

  /* cSpell:disable */

  render() {
    if (this.state.error) {
      return <div>Network error. Please try again later.</div>;
    }
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (<BookSearch
            bookshelves={bookshelves}
            books={this.state.books}
            onSearch={this.onSearch}
            searchResult={this.state.searchResult}
            moveShelf={this.onMoveShelf}
            clearSearch={this.clearSearch} />)} />
        <Route
          exact
          path="/"
          render={() => (<BookList
            bookshelves={bookshelves}
            books={this.state.books}
            moveShelf={this.onMoveShelf} />)} />
      </div>
    )
  }
}

export default App
