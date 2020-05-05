import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';

class LikeProfileItem extends Component{
  render(){
    const {postLikeHandle, postLikeAvatar, postLikeName} = this.props;
    return(
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
          <img src={postLikeAvatar} style={{width: '100px'}} alt=""
          className="rounded-circle"/>
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          {postLikeHandle}
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          {postLikeName}
        </div>
        </div>
      </div>
    )
  }
}

export default LikeProfileItem;