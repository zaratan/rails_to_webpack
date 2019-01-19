import React from 'react';
import PropTypes from 'prop-types';
import { postType } from '../APIs/posts';
import Post from './Post';
import { userType } from '../APIs/users';

function PostList({ posts, currentUser }) {
  return (
    <ul>
      {posts.map(post => (
        <Post post={post} key={post.id} currentUser={currentUser} />
      ))}
    </ul>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(postType).isRequired,
  currentUser: userType,
};

export default PostList;
