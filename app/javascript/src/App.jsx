import React, { Component } from 'react';
import { fetchPosts } from './APIs/posts';
import PostList from './components/PostList';

export default class App extends Component {
  state = {
    posts: [],
  };

  refreshPosts = async () => {
    const posts = await fetchPosts();
    this.setState({
      posts,
    });
  };

  componentDidMount = () => {
    this.refreshPosts();
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        Post count: {posts.length}
        <PostList posts={posts} />
      </div>
    );
  }
}
