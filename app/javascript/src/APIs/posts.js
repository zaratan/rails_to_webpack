import PropTypes from 'prop-types';

const addCsrf = object => {
  const token = document.querySelector('meta[name=csrf-token]').content;
  const key = document.querySelector('meta[name=csrf-param]').content;
  object[key] = token;
  return object;
};

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

export const addPost = async ({ text }) => {
  const postResponse = await fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(addCsrf({ post: { text } })),
  });
  const postJSON = await postResponse.json();
  return postJSON;
};

export const removePost = async id => {
  const postResponse = await fetch(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(addCsrf({})),
  });
  const postJSON = await postResponse.json();
  return postJSON;
};

export const updatePost = async ({ id, text }) => {
  const postResponse = await fetch(`/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(addCsrf({ post: { text } })),
  });
  const postJSON = await postResponse.json();
  return postJSON;
};

export const postType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
});
