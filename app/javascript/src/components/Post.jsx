import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postType, removePost, updatePost } from '../APIs/posts';
import { userType } from '../APIs/users';
import PostForm from './PostForm';

export class Post extends Component {
  static propTypes = {
    post: postType,
    currentUser: userType,
    actOnRemove: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
    updateStatePosts: PropTypes.func.isRequired,
  };

  state = {
    edit: false,
  };

  handleRemoveClick = async () => {
    const { post, actOnRemove, setErrors } = this.props;
    const result = await removePost(post.id);
    if (result.post) {
      actOnRemove(result.post);
    } else {
      setErrors(result.errors);
    }
  };

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({
      edit: !edit,
    });
  };

  renderButtons = () => {
    const { post, currentUser } = this.props;
    const { edit } = this.state;
    if (currentUser && post.author.id === currentUser.id) {
      if (edit) {
        return (
          <div className="icon-container cancel-flex">
            <i
              className="fas fa-plus cancel"
              onClick={this.toggleEdit}
              onKeyPress={this.toggleEdit}
              tabIndex={0}
              role="button"
            />
          </div>
        );
      }
      return (
        <div className="icon-container">
          <i
            className="fas fa-edit edit"
            role="button"
            tabIndex={0}
            onClick={this.toggleEdit}
            onKeyPress={this.toggleEdit}
          />
          <i
            className="remove fas fa-trash-alt"
            style={{ cursor: 'pointer' }}
            onClick={this.handleRemoveClick}
            onKeyPress={this.handleRemoveClick}
            role="button"
            tabIndex={0}
          />
        </div>
      );
    }
  };

  renderPost = () => {
    const { edit } = this.state;
    const { post, updateStatePosts, setErrors } = this.props;
    if (edit) {
      return (
        <span className="text">
          <PostForm
            post={post}
            setErrors={setErrors}
            actOnPost={updatedPost => {
              updateStatePosts(updatedPost);
              return this.toggleEdit();
            }}
            actOnSubmit={updatePost}
          />
          {this.renderButtons()}
        </span>
      );
    }
    return (
      <span className="text">
        {post.text}
        {this.renderButtons()}
        <span className="author">
          <span>by </span>
          <span className="author-name" style={{ display: 'inline-block' }}>
            {post.author.username}
          </span>
        </span>
      </span>
    );
  };

  render() {
    return <li className="post">{this.renderPost()}</li>;
  }
}

export default Post;
