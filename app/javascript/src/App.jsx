import React, { Component } from 'react';
import { fetchPosts, addPost } from './APIs/posts';
import PostList from './components/PostList';
import { fetchCurrentUser } from './APIs/users';
import PostForm from './components/PostForm';
import ErrorList from './components/ErrorList';

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
      <div>
        Hello {currentUser ? currentUser.username : 'Unknown'} ! Post count:{' '}
        {posts.length}
        <ErrorList errors={errors} />
        <section className="post-create">
          <p>What are you thinking about ?</p>
          <PostForm
            actOnPost={this.addNewPost}
            actOnSubmit={addPost}
            setErrors={this.setErrors}
          />
        </section>
        <PostList
          posts={posts}
          currentUser={currentUser}
          setErrors={this.setErrors}
          actOnRemove={this.removePost}
          updatePost={this.updatePost}
        />
      </div>
    );
  }
}
