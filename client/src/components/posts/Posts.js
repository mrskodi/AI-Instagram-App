import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../action/postActions';
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import isEmpty from '../../utils/isEmpty';

class Posts extends Component {
  componentDidMount(){
    // call getPosts action
    this.props.getPosts();
  }

  render() {

    const {posts, loading } = this.props.post;
    let postContent;

    // if(isEmpty(posts)){
    //   postContent = <h3>Click on the
    //     <i className="fas fa-plus fa-fw"></i> 
    //     on the navbar to add a post!</h3>
    // } else if(loading){
    //   postContent = <Spinner/>;
    // }
    if(posts === null || loading){
      postContent = <Spinner/>
    } else if(posts.length > 0){
      postContent = posts.map(post => <PostItem key={post._id} post={post}/>);
    } 
    // else{
    //   postContent = <h3>No Posts Found</h3>
    // }

    return (
      <div className="feed">
        <div className="container">
        <h3>Click on the <i className="fas fa-plus fa-fw"></i> on the navbar to add a post!
        </h3>
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
