import React from 'react'
import Book from './Book';
import './App.css'

class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    {this
                        .props
                        .books
                        .map(book => (<Book key={book.id} bookDetails={book} moveShelf={this.props.moveShelf}/>))
}
                </ol>
            </div>
        )
    }
}

export default SearchResults;