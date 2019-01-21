import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { postType, updatePost } from '../APIs/posts';
import { userType } from '../APIs/users';
import PostForm from './PostForm';
import PostStyled from './styles/PostStyled';
import { CancelIcon, CancelIconContainer } from './styles/Icon';

const EmbeddedForm = styled.div`
  width: 97%;
`;

export default class PostEdit extends Component {
  static propTypes = {
    post: postType,
    currentUser: userType,
    setErrors: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateStatePosts: PropTypes.func.isRequired,
  };

  renderButtons = () => {
    const { post, currentUser } = this.props;
    if (currentUser && post.author.id === currentUser.id) {
      return (
        <CancelIconContainer>
          <CancelIcon
            className="fas fa-plus"
            onClick={this.toggleEdit}
            onKeyPress={this.toggleEdit}
            tabIndex={0}
            role="button"
          />
        </CancelIconContainer>
      );
    }
  };

  render() {
    const { post, setErrors, updateStatePosts, toggleEdit } = this.props;
    return (
      <PostStyled className="post">
        <EmbeddedForm>
          <PostForm
            post={post}
            setErrors={setErrors}
            actOnPost={updatedPost => {
              updateStatePosts(updatedPost);
              return toggleEdit();
            }}
            actOnSubmit={updatePost}
          />
          {this.renderButtons()}
        </EmbeddedForm>
      </PostStyled>
    );
  }
}
