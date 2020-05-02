import React, { Component } from 'react';
import Posts from '../posts/Posts';

class Dashboard extends Component{
  render(){
    return(
      // should load all posts
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              <Posts></Posts>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;