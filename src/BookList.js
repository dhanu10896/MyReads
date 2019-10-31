import React from 'react'
import NavBar from './NavBar';
import BookCase from './BookCase';
import OpenSearch from './OpenSearch';
import './App.css'

class BookList extends React.Component {
    render() {
        return (
            <div className="list-books">
                <NavBar navName='Your Reads' />
                <BookCase bookshelves={this.props.bookshelves} books={this.props.books} moveShelf={this.props.moveShelf} />
                <OpenSearch />
            </div>
        )
    }
}

export default BookList;