import React, { Component } from 'react';
import { fetchPosts } from './APIs/posts';
import PostList from './components/PostList';
import { fetchCurrentUser } from './APIs/users';

export default class App extends Component {
  state = {
    posts: [],
    currentUser: null,
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

  componentDidMount = async () => {
    await this.refreshCurrentUser();
    await this.refreshPosts();
  };

  render() {
    const { posts, currentUser } = this.state;
    return (
      <div>
        Hello {currentUser ? currentUser.username : 'Unknown'} ! Post count:{' '}
        {posts.length}
        <PostList posts={posts} currentUser={currentUser} />
      </div>
    );
  }
}
