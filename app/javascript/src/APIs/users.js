import PropTypes from 'prop-types';

export const fetchCurrentUser = async () => {
  const usersResponse = await fetch('/users', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const usersJSON = await usersResponse.json();
  return usersJSON.user;
};

export const userType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});
