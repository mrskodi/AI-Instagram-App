import React, { Component } from 'react';

class UserFollowersItem extends Component{
  render(){

    {userFollowers.map(follower => {
      follower.handle !== profile.handle ? (<span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i className="fas fa-user-plus"></i></button></span>) :

      (<span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i className="fas fa-user-plus"></i></button></span>)
    })}

    return(
      <div>

      </div>
    )
  }
};

export default UserFollowersItem;