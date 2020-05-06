import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { getPost } from '../../action/postActions';

class ProfilePostItem extends Component{

  onPostClick(id){
    this.props.getPost(id);
  } 
  render(){
    const { post, errors } = this.props;
    let profilePostContent;

    if(post.isImageOrVideo === 'Image'){
      // the html tag should be an image tag
      profilePostContent = <img 
                      src={post.imageOrVideoLink}/>
    }
    if(post.isImageOrVideo === 'Video'){
      // the html tag should be a ReactPlayer
      profilePostContent = <ReactPlayer 
                      controls 
                      url={post.imageOrVideoLink}/>
    }
    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-3">
            <Link to={`/post/id/${post._id}`} className="text-dark" onClick={this.onPostClick.bind(this, post._id)}>
                {profilePostContent}
              </Link>
          </div>
        </div>
      </div>
    )
  }
}

ProfilePostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { getPost }) (ProfilePostItem);