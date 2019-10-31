import React from 'react'
import Book from './Book';
import './App.css'

class BookShelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this
                            .props
                            .books
                            .filter(book => book.shelf === this.props.shelf.key)
                            .map(book => (<Book key={book.id} bookDetails={book} moveShelf={this.props.moveShelf}/>))}
                    </ol>
                </div>
            </div>
        )
    }
}
export default BookShelf;