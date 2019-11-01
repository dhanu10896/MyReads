import React from 'react'
import './App.css'

class BookShelfChanger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentShelf: this.props.currentShelf
        }

        this.onMove = event => {
            const { value } = event.target;

            this.setState({ currentShelf: value })
            this.props.moveShelf(this.props.bookToUpdate, value)
        }
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

export default BookShelfChanger;