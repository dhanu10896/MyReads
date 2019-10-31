import React from 'react'
import BookShelf from './BookShelf';
import './App.css'

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

export default BookCase;