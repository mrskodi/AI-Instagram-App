// PostItem is a component that defines how a Post should look like

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PostItem extends Component{
  render(){

    const {post} = this.props;

    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-3">
            <p>
              <Link to="/profile">
              <img className="rounded-circle d-none d-md-inline"
                src={post.avatar}
                style={{width: '80px'}}
                alt=""
              />
              </Link>
              <span className="post-handle">{post.handle}</span>
            </p>
          </div>
          <div className="col-md-10">
            
            <img src={post.imageOrVideo}/>
            
            <p className="lead">{post.text}</p>
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, null)(PostItem);