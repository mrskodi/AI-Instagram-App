import React, { Component } from 'react';
import Posts from '../posts/Posts';

class Dashboard extends Component{
  render(){
    return(
      // should load all posts
      <div className="container">
        <Posts></Posts>
      </div>
    )
  }
}

export default Dashboard;