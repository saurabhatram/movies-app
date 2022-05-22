import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'0.5rem'}}> 
          <Link to='/'> <h1 >Movies</h1></Link>
          <Link to='/Favourites'><h2 style={{marginLeft:"2rem", marginTop:"0.5rem"}}>Favourites</h2></Link>
      </div>
    )
  }
}


