import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import { followUserByHandle } from '../../action/profileActions'; 
import { unFollowUserByHandle } from '../../action/profileActions';


class ProfileItem extends Component {
    
   constructor() {
        super();
        this.state = {
          showUnFollowButton: '',
          showFollowButton : ''
        };
      }

      componentDidMount () {      
            console.log('inside componentDidMount.....')            
            const loggedInUserHandle = this.props.loggedInUserHandle;
            
            this.props.profiles.map(profile => {      
              if(profile.handle === this.props.profile.handle)
              {         
                console.log(profile.handle);
              
                const followersList = profile.followers; 
                console.log(followersList);         
                if(followersList.length > 0){
                  followersList.map(follower => {
                    console.log(follower.handle );
                    console.log(loggedInUserHandle);
                    if(follower.handle === loggedInUserHandle){               
                      this.setState({showUnFollowButton: true});
                    //showUnFollowButton = true;
                    console.log('.................................')
                    console.log(this.state.showUnFollowButton);                   
                    }             
                  })
                  console.log('above if................')
                  console.log(this.state.showUnFollowButton)
                  
                  if(!this.state.showUnFollowButton){
                    this.setState({showFollowButton: true});
                    console.log('this.showFollowButton = true');
                  }                       
                }
                else{
                  console.log('inside else...')
                  this.setState({showFollowButton: 'true'});          
                  console.log(this.state.showFollowButton);
                }
              }
            })         
            //const { profile } = this.props;  
          }
      
    
    onFollowClick(e){  
      console.log('follow.....');    
      console.log(this.props.profile.handle);
      this.props.followUserByHandle(this.props.profile.handle);
      this.setState({showFollowButton: false}); 
      this.setState({showUnFollowButton: true});        
    }

    onUnFollowClick(e){   
      console.log('Unfollow.....')    
      console.log(this.props.profile.handle); 
      this.props.unFollowUserByHandle(this.props.profile.handle);  
      this.setState({showUnFollowButton: false});  
      this.setState({showFollowButton: true});      
    }
  
  render() {
    const { profile } = this.props;  
    let button;
    if(this.state.showFollowButton){
      button = <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i class="fas fa-user-plus"></i></button>
    }else{
      button = <button className="btn btn-light mr-1" onClick={this.onUnFollowClick.bind(this)}><i class="fas fa-user-minus"></i></button>
    }
   
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2">

            <img src={profile.avatar} alt="" className="rounded-circle avatar-140" />

          </div>
          <div className="col-xs-6 col-sm-7 col-md-8 col-lg-10 col-xl-10">
            <h3>{profile.name}</h3>
            <p>
            {isEmpty(profile.bio) ? (<span></span>) : (<span>{profile.bio}</span>)}
            </p>            
            <p>{profile.user.name}</p>           
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

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  followUserByHandle: PropTypes.func.isRequired,
  unFollowUserByHandle: PropTypes.func.isRequired,
  getUserFollowerList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loggedInUserHandle: state.auth.user.handle,
    profiles: state.profile.profiles
  });
  
export default connect(mapStateToProps, { followUserByHandle, unFollowUserByHandle })(ProfileItem);
