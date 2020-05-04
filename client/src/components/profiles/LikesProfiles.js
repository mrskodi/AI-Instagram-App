import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import { getProfileByHandle } from '../../action/profileActions';
import isEmpty from '../../utils/isEmpty';

class LikesProfiles extends Component{
  
  // componentDidMount(){
    
  //   if(!isEmpty(this.props.postLikes)){
  //     console.log(`People who have liked the post: ${this.props.postLikes}`);
  //     // this.props.getProfilesByLikes(this.props.postLikes);
  //   }else{
  //     console.log('no one has liked the post yet');
  //   }
  //   // Get the posts[]
  //   // For each post in posts[], get the likes[]
  //   // For each user/like in the likes[], call getProfileByHandle(like.handle)
  //   // this.props.posts.map(
  //   //   post => post.likes.map(
  //   //     like => this.props.getProfilesByLikes(like.handle)
  //   //   )
  //   // );

  //   // Pass the post.likes[] to getProfilesByLikes action
  //   // this.props.getProfilesByLikes(post.likes);

    
  // }
   
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
  postLikes: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post.post,
  postLikes: state.post.post.likes,
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle })(LikesProfiles);