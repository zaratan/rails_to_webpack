import React, { Component } from 'react';
import { postType } from '../APIs/posts';
import { userType } from '../APIs/users';

export class Post extends Component {
  static propTypes = {
    post: postType,
    currentUser: userType,
  };

  renderButtons = () => {
    const { post, currentUser } = this.props;
    if (currentUser && post.author.id === currentUser.id) {
      return (
        <div className="icon-container">
          <i className="fas fa-edit edit" />
          <i
            className="remove fas fa-trash-alt"
            style={{ cursor: 'pointer' }}
          />
        </div>
      );
    }
  };

  render() {
    const { post } = this.props;
    return (
      <li className="post">
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
      </li>
    );
  }
}

export default Post;
