import React, { Component } from 'react';

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
                <p className="display-5"><span>Following : {profile.following.length}</span> <span className="divider">|</span> <span> Followers : {profile.followers.length}</span></p>            
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ProfileHeader;
