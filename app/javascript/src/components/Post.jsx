import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { postType, removePost, updatePost } from '../APIs/posts';
import { userType } from '../APIs/users';
import PostForm from './PostForm';
import PostStyled from './styles/PostStyled';
import PostEdit from './PostEdit';
import PostShow from './PostShow';

const EmbeddedForm = styled.div`
  width: 97%;
`;

class Post extends Component {
  static propTypes = {
    post: postType,
    actOnRemove: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
    updateStatePosts: PropTypes.func.isRequired,
    currentUser: userType,
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

  render() {
    const { edit } = this.state;
    const { post, updateStatePosts, setErrors, currentUser } = this.props;
    if (edit) {
      return (
        <PostEdit
          post={post}
          currentUser={currentUser}
          setErrors={setErrors}
          updateStatePosts={updateStatePosts}
          toggleEdit={this.toggleEdit}
        />
      );
    }
    return (
      <PostShow
        post={post}
        currentUser={currentUser}
        removeAct={this.handleRemoveClick}
        toggleEdit={this.toggleEdit}
      />
    );
  }
}

export default Post;
