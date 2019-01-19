import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postType } from '../APIs/posts';

export default class PostForm extends Component {
  static propTypes = {
    post: postType,
    actOnSubmit: PropTypes.func.isRequired,
    actOnPost: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: props.post ? props.post.text : ''
    };
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { actOnPost, actOnSubmit, setErrors } = this.props;
    const { text } = this.state;
    const newPost = await actOnSubmit(text);
    if (newPost.post) {
      actOnPost(newPost.post);
      this.setState({
        text: '',
      });
    } else {
      setErrors(newPost.errors);
    }
  };

  render() {
    const { text } = this.state;
    return (
      <form className="newPost" onSubmit={this.handleSubmit}>
        <label htmlFor="text" style={{ flexGrow: 1, marginRight: '1rem' }}>
          <span style={{ display: 'none' }}>Text :</span>
          <input
            type="text"
            name="text"
            id="text"
            className="text-field"
            style={{ width: '100%' }}
            placeholder="Jolt something :)"
            value={text}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Post!" />
      </form>
    );
  }
}
