import React, { Component } from 'react';
import { postType } from '../APIs/posts';

export class Post extends Component {
  static propTypes = {
    post: postType,
  };

  render() {
    const { post } = this.props;
    return (
      <li className="post">
        <span className="text">
          {post.text}
          <span className="author">
            <span>by </span>
            <span className="author-name">{post.author.username}</span>
          </span>
        </span>
      </li>
    );
  }
}

export default Post;
