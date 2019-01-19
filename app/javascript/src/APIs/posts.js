import PropTypes from 'prop-types';

export const fetchPosts = async () => {
  const postsResponse = await fetch('/posts', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const postsJSON = await postsResponse.json();
  return postsJSON.posts;
};

export const postType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
});
