import React from 'react'
import './App.css'
import Link  from 'react-router-dom'

class OpenSearch extends React.Component {
    render() {
        return (
            <div className="open-search">
                <Link to="/search" ><button>Add a book</button></Link>
            </div>
        )
    }
}
export default OpenSearch;