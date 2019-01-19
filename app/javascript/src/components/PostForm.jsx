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
            ref={input => {
              this.nameInput = input;
            }}
          />
        </label>
        <input type="submit" value="Post!" />
      </form>
    );
  }
}
