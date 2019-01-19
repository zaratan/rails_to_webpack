import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { postType, removePost, updatePost } from '../APIs/posts';
import { userType } from '../APIs/users';
import PostForm from './PostForm';
import PostStyled from './styles/PostStyled';

const IconContainer = styled.div`
  position: absolute;
  right: 0.7rem;
  top: 0.7rem;
  display: flex;
  width: 3.5rem;
  justify-content: space-between;
`;

const CancelIconContainer = styled(IconContainer)`
  justify-content: flex-end;
`;

const Icon = styled.i`
  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    box-shadow: none;
    color: #31437a;
  }

  opacity: 0.5;
  transition: opacity 0.3s;
  cursor: pointer;
`;

const CancelIcon = styled(Icon)`
  transform: rotate(45deg);
`;

const AuthorSpan = styled.span`
  font-size: 1.2rem;
  opacity: 0.8;
  position: absolute;
  bottom: 0;
  right: 0.5rem;
`;

const EmbeddedForm = styled.div`
  width: 97%;
`;

const AuthorName = styled.span`
  display: inline-block;

  &::first-letter {
    text-transform: capitalize;
  }
`;

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
      return (
        <IconContainer>
          <Icon
            className="fas fa-edit"
            role="button"
            tabIndex={0}
            onClick={this.toggleEdit}
            onKeyPress={this.toggleEdit}
          />
          <Icon
            className="fas fa-trash-alt"
            onClick={this.handleRemoveClick}
            onKeyPress={this.handleRemoveClick}
            role="button"
            tabIndex={0}
          />
        </IconContainer>
      );
    }
  };

  renderPost = () => {
    const { edit } = this.state;
    const { post, updateStatePosts, setErrors } = this.props;
    if (edit) {
      return (
        <EmbeddedForm>
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
        </EmbeddedForm>
      );
    }
    return (
      <>
        {post.text}
        {this.renderButtons()}
        <AuthorSpan>
          <span>by </span>
          <AuthorName>{post.author.username}</AuthorName>
        </AuthorSpan>
      </>
    );
  };

  render() {
    return <PostStyled className="post">{this.renderPost()}</PostStyled>;
  }
}

export default Post;
