import React, { Component } from 'react';
import Posts from '../posts/Posts';

class Dashboard extends Component{
  render(){
    return(
      // should load all posts
      <div className="pagecontent">
        <div className="container">
          <Posts></Posts>
        </div>
      </div>
    )
  }
}

export default Dashboard;