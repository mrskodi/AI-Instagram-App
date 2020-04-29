import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getPost } from '../../action/postActions';
import isEmpty from '../../utils/isEmpty';

class Post extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render(){
    const { post, loading } = this.props.post;
    let postContent;

    if(post === null || loading || isEmpty(post)){
      postContent = <Spinner/>
    }else{
      postContent = (
        <div>
          <PostItem post={post} showActions={false}></PostItem>
        </div>
      );      
    }

    return(
      <div className="post">
        <div className="container"> 
          <div className="row">
            <div className="col-md-12">
              <Link to="/dashboard" className="btn btn-light mb-3">
                Back to dashboard
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);