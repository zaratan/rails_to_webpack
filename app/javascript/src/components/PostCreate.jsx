import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { addPost } from '../APIs/posts';
import SectionStyled from './styles/SectionStyled';
import PostForm from './PostForm';

const Header = styled.p`
  margin: 0;
`;

const PostFormStyled = styled(PostForm)`
  display: flex;
  width: 100%;
`;

function PostCreate({ addNewPost, setErrors }) {
  return (
    <SectionStyled className="post-create">
      <Header>What are you thinking about ?</Header>
      <PostFormStyled
        actOnPost={addNewPost}
        actOnSubmit={addPost}
        setErrors={setErrors}
      />
    </SectionStyled>
  );
}

PostCreate.propTypes = {
  addNewPost: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default PostCreate;
