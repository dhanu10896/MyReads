import React from 'react'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './App.css'

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
                {this.props.searchResult !== undefined && this.props.searchResult.length > 0 &&
                    <SearchResults
                        books={this.props.searchResult}
                        moveShelf={this.props.moveShelf} />
                }
            </div>
        )
    }
}
export default BookSearch;

