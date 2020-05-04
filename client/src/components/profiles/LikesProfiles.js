import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import { getProfilesByLikes } from '../../action/profileActions';

class LikesProfiles extends Component{
  
  componentDidMount(){
    
    // Get the posts[]
    // For each post in posts[], get the likes[]
    // For each user/like in the likes[], call getProfileByHandle(like.handle)
    // this.props.posts.map(
    //   post => post.likes.map(
    //     like => this.props.getProfilesByLikes(like.handle)
    //   )
    // );

    // Pass the post.likes[] to getProfilesByLikes action
    // this.props.getProfilesByLikes(post.likes);
    
  }

  componentWillReceiveProps(newProps){
    if(newProps.post){
      this.props.getProfilesByHandle(post.likes)
  //     this.props.posts.map(
  //       post => post.likes.map(
  //         like => this.props.getProfileByHandle(like.handle)
  //       )
  //     );
    }
  }
   
  render(){
    const { profile, loading } = this.props.profile;
    let profileItem;
    if(profile === null || loading){
      profileItem = <Spinner/>;
    }else{
      profileItem = <ProfileItem profile={profile}></ProfileItem>
    }
    
    return(
      <div className="LikesProfile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="display-10 text-center">Users who have liked the post you are viewing now...</h3>
              {profileItem}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LikesProfiles.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProfilesByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post.post,
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfilesByLikes })(LikesProfiles);