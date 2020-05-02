import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { addPost } from '../../action/postActions'

class PostForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      imageOrVideoLink: '',
      text: '',
      isImageOrVideo: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit(e){
    e.preventDefault();
    //const { user } = this.props.auth;
    const newPost = {
      imageOrVideoLink: this.state.imageOrVideoLink,
      isImageOrVideo: this.state.isImageOrVideo,
      text: this.state.text,
      
      // name: user.name,
      // handle: user.handle,
      // avatar: user.avatar
    };

    this.props.addPost(newPost, this.props.history);
  }  

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
    const { errors } = this.state;

    return(
      <div className="post-form mb-3">
        <div className="col-md-8 m-auto">
          <div className="card card-info">
            <div className="card-header text-black">Ready to share a picture or a video? Enter details below...</div>
            <div className="card-body">
              <form id="addPost-form" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label style={{margin: '7px'}} for="imageOrVideo">Choose whether sharing a video or an image </label>
                  <select id="imageOrVideo" className="form-group" name="isImageOrVideo" form="addPost-form" value={this.state.isImageOrVideo} onChange={this.onChange}>
                    <option>-----</option>
                    <option>Video</option>
                    <option>Image</option>
                  </select>
                  
                  <TextFieldGroup
                    placeholder="Paste the url of your image/video"
                    name="imageOrVideoLink"
                    value={this.state.imageOrVideoLink}
                    onChange={this.onChange}
                    error={errors.imageOrVideoLink}
                  />
                </div>
                <div className="form-group">  
                  <TextFieldGroup
                    placeholder="add title or text for your post"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange.bind(this)}
                    error={errors.text}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);