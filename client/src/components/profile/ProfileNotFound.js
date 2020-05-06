import React, { Component } from 'react';

class ProfileNotFound extends Component{
  render(){
    return(
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              <h3>There is no user with that handle.</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileNotFound;