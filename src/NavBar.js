import React from 'react'
import './App.css'


class NavBar extends React.Component {
    render() {
        return (
            <div className="list-books-title" >
                <h1>{this.props.navName}</h1>
            </div >
        )
    }
}

export default NavBar;