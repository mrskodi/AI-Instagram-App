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
            <Link to="/profile">
              <img className="rounded-circle d-none d-md-block"
                src={post.avatar}
                style={{width: '50px'}}
                alt=""
              />
            </Link>
          
            <p className="text-left" style={{fontweight:"bold"}}>{post.handle}</p>
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