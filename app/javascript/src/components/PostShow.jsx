import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { postType } from '../APIs/posts';
import { userType } from '../APIs/users';
import PostStyled from './styles/PostStyled';
import { IconContainer, Icon } from './styles/Icon';

const AuthorSpan = styled.span`
  font-size: 1.2rem;
  opacity: 0.8;
  position: absolute;
  bottom: 0;
  right: 0.5rem;
`;

const AuthorName = styled.span`
  display: inline-block;

  &::first-letter {
    text-transform: capitalize;
  }
`;

class PostShow extends React.Component {
  static propTypes = {
    post: postType,
    currentUser: userType,
    removeAct: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
  };

  renderButtons = () => {
    const { post, currentUser, toggleEdit, removeAct } = this.props;
    if (currentUser && post.author.id === currentUser.id) {
      return (
        <IconContainer>
          <Icon
            className="fas fa-edit"
            role="button"
            tabIndex={0}
            onClick={toggleEdit}
            onKeyPress={toggleEdit}
          />
          <Icon
            className="fas fa-trash-alt"
            onClick={removeAct}
            onKeyPress={removeAct}
            role="button"
            tabIndex={0}
          />
        </IconContainer>
      );
    }
  };

  render() {
    const { post } = this.props;
    return (
      <PostStyled className="post">
        {post.text}
        {this.renderButtons()}
        <AuthorSpan>
          <span>by </span>
          <AuthorName>{post.author.username}</AuthorName>
        </AuthorSpan>
      </PostStyled>
    );
  }
}
PostShow.propTypes = {};

export default PostShow;
