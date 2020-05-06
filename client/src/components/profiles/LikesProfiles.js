import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import { getPost } from '../../action/postActions';
//import { getProfileByHandle } from '../../action/profileActions';
import isEmpty from '../../utils/isEmpty';
import LikeProfileItem from './LikeProfileItem';
import { Link } from 'react-router-dom';

class LikesProfiles extends Component{
  
  componentDidMount(){
    this.props.getPost(this.props.match.params.id);
  }
   
  render(){

    const { postLikes } = this.props;
    const { loading } = this.props.post;
    let profileItems;

    if(postLikes === null || loading){
      profileItems = <Spinner/>
    }
    else if(!isEmpty(postLikes)){
      profileItems = postLikes.map(postLike => (
        // Pass the profile handle to likeProfileItem
        // <LikeProfileItem postLikeHandle= {postLike.handle}
        //                  postLikeAvatar= {postLike.avatar} 
        //                  postLikeName={postLike.name}>
            
        // </LikeProfileItem>
        <LikeProfileItem postLike = {postLike}/>
        
        // Once you have the user profile, pass it onto profileItem
      ))
     } 
    else{
      profileItems = <h4>No one has liked this post yet...</h4>
    }
    
    
    
    // else if(isEmpty(postLikes)){
    //   profileItems = "No one has liked this post yet..."
    // }else {
    //   // There are valid users in the likes[]
    //     profileItems = postLikes.map(postLike => (
    //     // Pass the profile handle to likeProfileItem
    //     <LikeProfileItem postLikeHandle= {postLike.handle}
    //     postLikeAvatar= {postLike.avatar} postLikeName={postLike.name}/>
    //     // Once you have the user profile, pass it onto profileItem
    //   ))
    // }
    {/*else{
      profileItem = <ProfileItem profile={profile}></ProfileItem>

    if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }



    }*/}
    
    return(
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              <h3 className="text-center">
                {!isEmpty(postLikes) && (<div>Wanderers who have liked this post.</div>)}
              </h3>
              <div className="col-md-12">
                <Link to="/dashboard" className="btn btn-light mb-3">
                  Return <i class="fas fa-home"></i>
                </Link>
                <h4>{profileItems}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LikesProfiles.propTypes = {
  //post: PropTypes.object.isRequired,
  postLikes: PropTypes.array.isRequired,
  //profile: PropTypes.object.isRequired,
  //auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  //getProfileByHandle: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post.post,
  postLikes: state.post.post.likes,
  profile: state.profile,
  errors: state.errors,
  //auth: state.auth
});

export default connect(mapStateToProps, { getPost })(LikesProfiles);