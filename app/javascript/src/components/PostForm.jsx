import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { postType } from '../APIs/posts';

const TextField = styled.input`
  border: solid 1px #ccc;
  padding-left: 0.6rem;
  width: 100%;
`;

const TextLabel = styled.span`
  display: none;
`;

const Label = styled.label`
  margin-right: 1rem;
  flex-grow: 1;
  margin-right: '1rem';
`;

const Form = styled.form`
  display: flex;
`;

export default class PostForm extends Component {
  static propTypes = {
    post: postType,
    actOnSubmit: PropTypes.func.isRequired,
    actOnPost: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { post } = props;
    this.state = { text: post ? post.text : '' };
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  componentDidMount = () => {
    const { post } = this.props;
    if (post) {
      this.nameInput.focus();
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { actOnPost, actOnSubmit, setErrors, post } = this.props;
    const { text } = this.state;
    const newPost = await actOnSubmit({ text, id: post ? post.id : null });
    if (newPost.post) {
      actOnPost(newPost.post);
      if (!post) {
        this.setState({
          text: '',
        });
      }
    } else {
      setErrors(newPost.errors);
    }
  };

  render() {
    const { text } = this.state;
    return (
      <Form className="newPost" onSubmit={this.handleSubmit}>
        <Label htmlFor="text">
          <TextLabel>Text :</TextLabel>
          <TextField
            type="text"
            name="text"
            id="text"
            placeholder="Jolt something :)"
            value={text}
            onChange={this.handleChange}
            ref={input => {
              this.nameInput = input;
            }}
          />
        </Label>
        <input type="submit" value="Post!" />
      </Form>
    );
  }
}
