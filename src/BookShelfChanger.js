import React from 'react'
import './App.css'

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

export default BookShelfChanger;