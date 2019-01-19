import React, { Component } from 'react';
import { fetchPosts } from './APIs/posts';
import PostList from './components/PostList';
import { fetchCurrentUser } from './APIs/users';
import ErrorList from './components/ErrorList';
import Style from './components/Style';
import PostCreate from './components/PostCreate';

export default class App extends Component {
  state = {
    posts: [],
    currentUser: null,
    errors: [],
  };

  refreshPosts = async () => {
    const posts = await fetchPosts();
    this.setState({
      posts,
    });
  };

  refreshCurrentUser = async () => {
    const currentUser = await fetchCurrentUser();
    this.setState({
      currentUser,
    });
  };

  setErrors = errors => {
    this.setState({
      errors,
    });
  };

  addNewPost = post => {
    const { posts } = this.state;
    this.setState({
      posts: [post, ...posts],
      errors: [],
    });
  };

  updatePost = updatedPost => {
    const { posts } = this.state;
    this.setState({
      posts: posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      ),
      errors: [],
    });
  };

  removePost = removedPost => {
    const { posts } = this.state;
    this.setState({
      posts: posts.filter(post => removedPost.id !== post.id),
      errors: [],
    });
  };

  componentDidMount = async () => {
    await this.refreshCurrentUser();
    await this.refreshPosts();
  };

  render() {
    const { posts, currentUser, errors } = this.state;
    return (
      <Style>
        Hello {currentUser ? currentUser.username : 'Unknown'} ! Post count:{' '}
        {posts.length}
        <PostCreate setErrors={this.setErrors} addNewPost={this.addNewPost} />
        <ErrorList errors={errors} />
        <PostList
          posts={posts}
          currentUser={currentUser}
          setErrors={this.setErrors}
          actOnRemove={this.removePost}
          updatePost={this.updatePost}
        />
      </Style>
    );
  }
}
