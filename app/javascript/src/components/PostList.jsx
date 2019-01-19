import React from 'react';
import PropTypes from 'prop-types';
import { postType } from '../APIs/posts';
import Post from './Post';
import { userType } from '../APIs/users';

function PostList({ posts, currentUser, actOnRemove, setErrors }) {
  return (
    <ul>
      {posts.map(post => (
        <Post
          post={post}
          key={post.id}
          currentUser={currentUser}
          actOnRemove={actOnRemove}
          setErrors={setErrors}
        />
      ))}
    </ul>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(postType).isRequired,
  currentUser: userType,
  actOnRemove: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default PostList;
