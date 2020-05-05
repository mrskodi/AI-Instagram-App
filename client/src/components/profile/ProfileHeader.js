import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-info-profile mb-3 text-white">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src={profile.avatar}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-center">{profile.name}</h1>           
                <p>{profile.email}</p>
                <p className="display-5">
                  <span>
                    {isEmpty(profile.following) ? (<p className="hide">not following anyone</p>) : (<p>{profile.following}</p>) }
                  </span>
                  {/*Following : {profile.following.length}</span>*/}
                  <span>
                    {isEmpty(profile.followers) ? (<p className="hide">no followers yet</p>) : (
                      <p>{profile.followers}</p>
                    )}
                  {/*Followers : {profile.followers.length} */}  
                  </span>
                </p>        
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ProfileHeader;
