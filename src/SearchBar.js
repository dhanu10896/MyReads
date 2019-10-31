import React from 'react'
import SearchBooksInput from './SearchBooksInput';
import CloseSearchButton from './CloseSearchButton';
import './App.css'

class SearchBar extends React.Component {
    render() {
        return (
            <div className="search-books-bar">
                <CloseSearchButton clearSearch={this.props.clearSearch}/>
                <SearchBooksInput onSearch={this.props.onSearch}/>
            </div>
        )
    }
}

export default SearchBar;