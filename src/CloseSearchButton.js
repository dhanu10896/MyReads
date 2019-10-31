import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'


class CloseSearchButton extends React.Component {
    render() {
        return (
            <Link to='/' onClick={this.props.clearSearch}>
                <button className="close-search"  >Close</button>
            </Link>
        )
    }
}

export default CloseSearchButton;