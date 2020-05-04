import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../action/postActions';

class CommentItem extends Component{

  onDeleteClick(postId, commentId){
    this.props.deleteComment(postId, commentId);
  }

  render(){
    const { postId, comment, auth } = this.props;
    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to='/getProfileByhandleOfUserWhoMadeTheComment'>
              <img className="rounded-circle d-none d-md-block"
                    src={comment.avatar}
                    style={{width: '50px'}}
                    alt="">
              </img>
              <br/>
              <p className="text-left font-weight-bold text-dark">{comment.handle}</p>
            </Link>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                      type="button"
                      className="btn btn-danger mr-1"
              >
                <i className="fas fa-times"></i>
              </button>
            ): null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment }) (CommentItem);