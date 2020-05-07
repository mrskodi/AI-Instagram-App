import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import { followUserByHandle } from '../../action/profileActions'; 
import { unFollowUserByHandle, getProfileByHandle } from '../../action/profileActions';
//import UserFollowersItem from './UserFollowersItem';

class ProfileItem extends Component {
    
    constructor(){
      super();
      this.state = {
        buttonContent: '',
        userFollowers: []
      }

      this.props.getProfileByHandle(this.props.user.handle)
    }

    componentDidMount(){
      // Get all followers of the logged in user by the user handle - followers[] is inside the profile of logged in user
      //this.props.getProfileByHandle(this.props.user.handle)
      

      //const {userFollowers} = this.props;
      // console.log('userFollowers');
      // console.log(userFollowers);
      
    }

    componentWillReceiveProps(nextProps){
      // Check if profileOfUser is received as a prop to this Component
      if(nextProps.profileOfUser){
        // Get the followers list of profileOfUser
        this.setState({userFollowers: nextProps.profileOfUser.followers});
      }

      const {profile} = this.props;
      let componentButton;
      const {userFollowers} = this.state;
      
      if((userFollowers != null) && (userFollowers[0] != undefined) && (userFollowers.length > 0)){
        
        userFollowers.map(follower => 
          componentButton = (follower.handle === profile.handle) ? (<span><button className="btn btn-light mr-1" onClick={this.onUnFollowClick.bind(this)}>unFollow</button></span>) : (<span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}>Follow</button></span>))
      }

      this.setState({buttonContent: componentButton});
    }

    onFollowClick(e){  
      console.log('follow.....');    
      console.log(this.props.profile.handle);
      this.props.followUserByHandle(this.props.profile.handle);      
    }

    onUnFollowClick(e){   
      console.log('Unfollow.....')    
      console.log(this.props.profile.handle); 
      this.props.unFollowUserByHandle(this.props.profile.handle);    
    }
  

    
  render() {
    const { profile, user } = this.props;     
    
    // const { userFollowers } = this.props.profile;
    // Write a function here to see if this ProfileItem is in the followers list of user
    
    // Write a function here to see if this ProfileItem is in the followers list of user

    // let buttonContent;
  //   if((userFollowers != null) && (userFollowers[0] != undefined) && (userFollowers.length > 0)){
        
  //       userFollowers.map(follower => 
  //         buttonContent = (follower.handle === profile.handle) ? (<span><button className="btn btn-light mr-1" onClick={this.onUnFollowClick.bind(this)}><i className="fas fa-user-minus"></i></button></span>) : (<span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i className="fas fa-user-plus"></i></button></span>))
    
  // }



//   if((userFollowers != null) && (userFollowers[0] != undefined) && (userFollowers.length > 0)){
        
//     userFollowers.map(follower => 
//       buttonContent = (follower.handle === profile.handle) ? (<span><button className="btn btn-light mr-1" onClick={this.onUnFollowClick.bind(this)}>UNFollow</button></span>) : (<span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}>Follow</button></span>))

// }
    

    // buttonContent = isProfileItemAFollower ? (<span><button className="btn btn-light mr-1" onClick={this.onUnFollowClick.bind(this)}><i className="fas fa-user-minus"></i></button></span>) : 
    
    // (<span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i className="fas fa-user-plus"></i></button></span>);
    
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
            {/* <span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i className="fas fa-user-plus"></i></button></span>   */}
              {/* <UserFollowersItem profile={profile} userFollowers={userFollowers}/> */}



            {/*If loop through the userFollowers array
             For each userFollower, userFollower.handle === profileItem.handle, display UNFOLLOW
             for the rest, display follow*/}

            
            

            {/* <span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i className="fas fa-user-plus"></i></button></span> 
            
            onClick={this.onFollowClick.bind(this)}

            onClick={this.onFollowClick.bind(this)}
            */}

            

            {this.state.buttonContent}




            {/* <span><button className="btn btn-light mr-1" onClick={this.onUnFollowClick.bind(this)}><i className="fas fa-user-minus"></i></button></span>       */}
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
  userFollowers: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  profileOfUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //userFollowers: state.auth.userFollowers,
  user: state.auth.user,
  profileOfUser: state.profile.profile
})

export default connect(mapStateToProps, { getProfileByHandle, followUserByHandle, unFollowUserByHandle })(ProfileItem);
