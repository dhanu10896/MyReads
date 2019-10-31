import React from 'react'
import './App.css'

class SearchBooksInput extends React.Component {
    render() {
        return (
            <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={this.props.onSearch}/>
            </div>
        )
    }
}

export default SearchBooksInput;