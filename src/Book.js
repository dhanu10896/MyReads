import React from 'react'
import './App.css'
import BookShelfChanger from './BookShelfChanger';

class Book extends React.Component {
    render() {
        const { bookDetails, moveShelf } = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128, height: 193, backgroundImage: `url(${bookDetails.imageLinks
                                && bookDetails.imageLinks.thumbnail})`
                        }}></div>
                        <BookShelfChanger bookToUpdate={bookDetails} currentShelf={bookDetails.shelf} moveShelf={moveShelf} />
                    </div>
                    <div className="book-title">
                        {bookDetails.title}
                    </div>
                    <div className="book-authors">{bookDetails.authors && bookDetails.authors.join(', ')}</div>
                </div>
            </li>
        )
    }
}

export default Book;