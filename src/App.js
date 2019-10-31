import React from 'react'
import * as BooksAPI from './BooksAPI'
import NavBar from './NavBar';
import './App.css'
import { Route, Link } from 'react-router-dom'




class App extends React.Component {
  // bookshelves = ['Currently Reading', 'Want to Read', 'Have Read'];
  bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Have Read' },
  ]

  constructor(props) {
    super(props)

    this.state = {
      books: [],
      searchResult: []
    }

    this.onMoveShelf = (bookToUpdate, newShelfKey) => {
      this.setState({
        book: this.state.books.map(book => {
          if (book.id == bookToUpdate.id) {
            book.shelf = newShelfKey
            BooksAPI.update(bookToUpdate, newShelfKey)
          }
        })
      })
    }
    
    this.addSearchedBookToShelf = (bookToAdd, shelfName) => {
      bookToAdd.shelf = shelfName;
      var tempBooks = this.state.books;
      tempBooks.push(bookToAdd)
      this.setState({
        books : tempBooks
      })
      BooksAPI.update(bookToAdd, shelfName)
    }

    this.clearSearch = () => {
      this.setState({
        searchResult:[]
      })
    }

    this.onSearch = (query) => {
      if(query.length > 0) {
        BooksAPI.search(query).then(searchResponse => {
          if(searchResponse.error) {
            this.clearSearch()
          } else {
            this.setState({ searchResult: searchResponse })
          }
        })
      } else {
        this.clearSearch()
      }
      
    }
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  /* cSpell:disable */



  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch 
          bookshelves={this.bookshelves} 
          books={this.state.books} 
          onSearch={this.onSearch} 
          searchResult={this.state.searchResult}
          moveShelf = {this.addSearchedBookToShelf}
          clearSearch = {this.clearSearch}/>
        )} />
        <Route exact path="/" render={() => (
          <BookList bookshelves={this.bookshelves} books={this.state.books} moveShelf={this.onMoveShelf} />
        )} />
      </div>
    )
  }
}

class SearchResults extends React.Component {
  render() {
    return (
      <div className="search-books-results">
        <ol className="books-grid"> {
          this.props.books.map(book => (
            <Book 
            key={book.id} 
            bookDetails={book} 
            moveShelf={this.props.moveShelf}/>
          ))
        }
        </ol>
      </div>
    )
  }
}
class SearchBooksInput extends React.Component {
  render() {
    return (
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" onChange={this.props.onSearch} />
      </div>
    )
  }
}
class CloseSearchButton extends React.Component {
  render() {
    return (
      <Link to='/'onClick={this.props.clearSearch}>
        <button className="close-search"  >Close</button>
      </Link>
    )
  }
}
class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-books-bar">
        <CloseSearchButton clearSearch = {this.props.clearSearch}/>
        <SearchBooksInput onSearch={this.props.onSearch} />
      </div>
    )
  }
}
class BookSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
    }

    this.onSearch = (event) => {
      this.setState({ query: event.target.value })
      this.props.onSearch(event.target.value)
    }


  }
  render() {
    return (
      <div className="search-books">
        <SearchBar onSearch={this.onSearch} clearSearch={this.props.clearSearch} />
        {this.props.searchResult!=undefined && this.props.searchResult.length > 0 &&
          <SearchResults 
          books={this.props.searchResult} 
          moveShelf={this.props.moveShelf} />
        }
      </div>
    )
  }
}
class Book extends React.Component {
  render() {
    const imageLink = this.props.bookDetails.imageLinks != undefined ?
    this.props.bookDetails.imageLinks.thumbnail : '';
    const { bookDetails, moveShelf } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLink})` }}></div>
            <BookShelfChanger bookToUpdate={bookDetails} currentShelf={bookDetails.shelf} moveShelf={moveShelf} />
          </div>
          <div className="book-title">
            {bookDetails.title}
          </div> {bookDetails.authors != undefined &&
            <div className="book-authors">{bookDetails.authors.map(author => (
              author + " "
            ))}</div>
          }
        </div>
      </li>
    )
  }
}

class BookShelfChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShelf: "none"
    }

    this.onMove = event => {
      this.setState({ currentShelf: event.target.value })
      this.props.moveShelf(this.props.bookToUpdate, event.target.value)
    }
  }
  componentDidMount() {
    this.setState({ currentShelf: this.props.currentShelf })

  }
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.currentShelf} onChange={this.onMove}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading" >Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}
class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.filter(book => book.shelf === this.props.shelf.key).map(book => (
              <Book key={book.id} bookDetails={book} moveShelf={this.props.moveShelf} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
class BookCase extends React.Component {
  render() {
    return (
      <div className="list-books-content">
        <div>
          {this.props.bookshelves.map(shelf => (
            <BookShelf key={shelf.key} shelf={shelf} books={this.props.books} moveShelf={this.props.moveShelf} />
          ))}
        </div>
      </div>
    )
  }
}
class BookList extends React.Component {
  render() {
    return (
      <div className="list-books">
        <NavBar navName='My Reading List' />
        <BookCase bookshelves={this.props.bookshelves} books={this.props.books} moveShelf={this.props.moveShelf} />
        <OpenSearch />
      </div>
    )
  }
}
class OpenSearch extends React.Component {
  render() {
    return (
      <div className="open-search">
        <Link to="/search" ><button>Add a book</button></Link>
      </div>
    )
  }
}

export default App
