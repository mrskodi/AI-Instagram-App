import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../action/postActions';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';
import Post from './Post';
import isEmpty from '../../utils/isEmpty';

class Posts extends Component {

  componentDidMount(){
    // call getPost action
    this.props.getPosts();
  }

  render() {

    const {posts, loading } = this.props.post;
    let postContent;

    if(isEmpty(posts)){
      postContent = <h3>There are no posts yet. Click on the
        <i className="fas fa-plus fa-fw"></i> 
        on the navbar and make the first post!</h3>
    } else if(loading){
      postContent = <Spinner/>;
    } else{
      postContent = posts.map(post => <PostItem post={post}/>);
    }

    return (
      <div className="feed">
        <div className="container">
          {postContent}
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
