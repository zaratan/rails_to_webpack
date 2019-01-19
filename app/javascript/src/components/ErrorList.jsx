import React from 'react';
import PropTypes from 'prop-types';

function ErrorList({ errors }) {
  return (
    <ul>
      {errors.map(err => (
        <li>{err}</li>
      ))}
    </ul>
  );
}

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ErrorList;
