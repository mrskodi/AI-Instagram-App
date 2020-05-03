import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';

class LikesProfiles extends Component{
   
  render(){
    const {posts, auth} = this.props.posts;  
    let likeProfileItems;
    
    if(posts === null || loading){
      likeProfileItems = <Spinner/>;
    }else{
      if(posts.length > 0){
        likeProfileItems = posts.likes.map(like => <ProfileItem></ProfileItem>)
      }
    }
    
    return(
      <div className="LikesProfile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="display-10 text-center">Users who have liked the post you are viewing now...</h3>
              
              Hey there!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LikesProfiles.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, null)(LikesProfiles);