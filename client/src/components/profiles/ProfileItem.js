import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import { followUserByHandle } from '../../action/profileActions'; 
import { unFollowUserByHandle } from '../../action/profileActions';


class ProfileItem extends Component {
    
    onFollowClick(e){  
      console.log('follow.....');    
      console.log(this.props.profile.handle);
      // Slice off 6 characters from this.props.profile.avatar
      const slicedAvatar = this.props.profile.avatar.slice(26); 
      console.log(slicedAvatar);
      this.props.followUserByHandle(this.props.profile.handle, slicedAvatar);
      
    }

    onUnFollowClick(e){   
      console.log('Unfollow.....')    
      console.log(this.props.profile.handle); 
      this.props.unFollowUserByHandle(this.props.profile.handle);    
    }
  
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2">
            <img src={profile.avatar} alt="" className="rounded-circle avatar-140" />
          </div>
          <div className="col-xs-6 col-sm-7 col-md-8 col-lg-10 col-xl-10">
            <h3>{profile.handle}</h3>
            <p>
            {isEmpty(profile.bio) ? (<span></span>) : (<span>{profile.bio}</span>)}
            </p>            
            <p>{profile.user.name}</p>           
            <Link to={`/profiles/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>          
            <p>
            <span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i className="fas fa-user-plus"></i></button></span>  
            <span><button className="btn btn-light mr-1" onClick={this.onUnFollowClick.bind(this)}><i className="fas fa-user-minus"></i></button></span>      
            </p>
          </div>         
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  followUserByHandle: PropTypes.func.isRequired,
  unFollowUserByHandle: PropTypes.func.isRequired,
};

export default connect( null, { followUserByHandle, unFollowUserByHandle })(ProfileItem);
