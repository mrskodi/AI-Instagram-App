import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import { followUserByHandle } from '../../action/profileActions'; 
import { unFollowUserByHandle } from '../../action/profileActions'; 
import { getFollowersListByHandle } from '../../action/profileActions'; 


class ProfileItem extends Component {  

  constructor(props){
    super(props);
    this.state = {isUnFollow : false};
  }
   componentDidMount(){   
        const loggedInUserHandle = this.props.loggedInUserHandle;
        const allProfilesInDB = this.props.allProfilesInDB;
        console.log(allProfilesInDB);
        const followers = this.props.getFollowersListByHandle(this.props.profile.handle);
        console.log('inside  componentDidMount.....')
        console.log(this.props.profile.handle);
        console.log(followers);

      
        }
    
    onFollowClick(e){    
      this.setState({isUnFollow: false});    
      this.props.followUserByHandle(this.props.profile.handle);      
    }

    onUnFollowClick(e){
      this.setState({isUnFollow: true});  
      this.props.unFollowUserByHandle(this.props.profile.handle);    
    }
  
  render() {
    const { profile } = this.props;  
    const isUnFollow = this.state.isUnFollow;
    let button = null;
    if (isUnFollow) {
      button = <UnFollowUserButton onClick={this.onUnFollowClick.bind(this)} />;
    } else {
      button = <FollowUserButton onClick={this.onFollowClick.bind(this)} />;
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.name}</h3>
            <p>
            {isEmpty(profile.bio) ? (<span></span>) : (<span>{profile.bio}</span>)}
            </p>            
            <p>{profile.email}</p>           
            <Link to={`/profiles/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>          
            <p>
            {button}          
            </p>
          </div>         
        </div>
      </div>
    );
  }
}


class UnFollowUserButton extends React.Component{
  constructor(props, context){
    super(props, context)
    console.log('created UnFollowUserButton button');
  }
  render(){
    return (
      <button onClick={this.props.onClick}>
        Unfollow
      </button>
    );
  }
}

class FollowUserButton extends React.Component{
  constructor(props, context){
    super(props, context)
    console.log('created follow user button');
  }
  render(){
    return (
      <button onClick={this.props.onClick}>
        Follow
      </button>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  followUserByHandle: PropTypes.func.isRequired,
  unFollowUserByHandle: PropTypes.func.isRequired,
  getFollowersListByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loggedInUserHandle: state.auth.user.handle,
    allProfilesInDB: state.profile.profiles
  });

export default connect(mapStateToProps , { followUserByHandle, unFollowUserByHandle, getFollowersListByHandle })(ProfileItem);
