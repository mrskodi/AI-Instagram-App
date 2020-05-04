// PostItem is a component that defines how a Post should look like

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { getPost, deletePost } from '../../action/postActions';
import classnames from 'classnames';
import { addLike } from '../../action/postActions';

class PostItem extends Component{
  onClick(e){
    // Call the getPost(pass the e.target.value) and display in a new page called post
    this.props.getPost(this.props.post._id);
  }

  onLikeClick(id){
    console.log(`Id of Post that is being liked: ${id}`);
    this.props.addLike(id);
  }

  onDeleteClick(postId){
    this.props.deletePost(postId);
  }

  findUserLike(likes){
    const { auth } = this.props;
    //if(likes>0){
    if(likes.filter(like => like.user === auth.user.id).length > 0){
      return true;
      }
    //}
    else{
      return false;
    }
  }

  render(){

    const { post, auth, showActions, errors } = this.props;
    let postContent;

    if(post.isImageOrVideo === 'Image'){
      // the html tag should be an image tag
      postContent = <img 
                      src={post.imageOrVideoLink}/>
    }
    if(post.isImageOrVideo === 'Video'){
      // the html tag should be a video tag
      postContent = <ReactPlayer 
                      controls 
                      url={post.imageOrVideoLink}/>
    }

    return(
      <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-3">
              <Link className="handle-link" to={`/profiles/${post.handle}`}>
                  <img className="rounded-circle d-none d-md-inline avatar-80"
                    src={post.avatar}
                    alt=""
                />
                  <span className="post-handle">{post.handle}</span>
              </Link>
              
            </div>
            <div className="col-md-10 text-center">
              <Link to={`/post/id/${post._id}`} className="text-dark" onClick={this.onClick.bind(this)}>
                  {postContent}
              </Link>
            </div>
          </div>
          <Link className="post-caption" to={`/post/id/${post._id}`}>
              {post.text}
          </Link>
          <br></br>
          {showActions ? (
            <span>
            <button type="button" 
                    className="btn btn-light mr-3"
                    onClick={this.onLikeClick.bind(this, post._id)}>
              <i className={classnames('far fa-heart', 
                                        {'fas text-danger': this.findUserLike(post.likes)})}
                                        
              />
            </button>
            <Link to={`/post/id/${post._id}`} className="btn btn-light mr-1">
              Comments
            </Link>
            {/* If user is the publisher of a post, Delete Post option shown */}
            {post.user === auth.user.id ? (
              <button type="button"
                      className="btn btn-danger mr-1"
                      onClick={this.onDeleteClick.bind(this, post._id)}>
                Delete
              </button>
            ) : (null)}

            <br/>
            {errors && (<p className="text-danger badge dadge-light">{errors.likeError}</p>)}
            <br/>
            <Link to='Get all users who have liked the post'>
              <p className="badge badge-light">{post.likes.length} likes</p>
            </Link>
            {post.comments.length > 0 ? (
              <Link to={`/post/id/${post._id}`}>
              <p className="badge badge-light">View {post.comments.length} comments</p>
              </Link>
            ): null }
          </span>
          ) : null}
        </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect( mapStateToProps, { getPost, deletePost, addLike })(PostItem);