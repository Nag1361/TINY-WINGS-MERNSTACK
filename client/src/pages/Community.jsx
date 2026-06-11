import React, { useState, useEffect } from 'react';
import { communityService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { FaHeart, FaComment } from 'react-icons/fa';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await communityService.getAllPosts(1, 10);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await communityService.createPost(newPost);
      setNewPost('');
      setShowForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await communityService.likePost(postId);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="community-container">
      <div className="container-fluid">
        <h1>Community Forum</h1>
        <p className="community-intro">Connect with other parents and share your experiences</p>

        {user ? (
          <div className="create-post-section">
            {!showForm ? (
              <button
                className="btn-primary"
                onClick={() => setShowForm(true)}
              >
                + Create Post
              </button>
            ) : (
              <form onSubmit={handleCreatePost} className="post-form">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  rows="4"
                ></textarea>
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Post
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <p className="login-prompt">Please <a href="/login">login</a> to create posts</p>
        )}

        {!loading ? (
          <div className="posts-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="post-card">
                  <div className="post-header">
                    <h4>{post.userId?.name}</h4>
                    <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                  </div>
                  <p className="post-content">{post.content}</p>
                  <div className="post-actions">
                    <button className="action-btn" onClick={() => handleLike(post._id)}>
                      <FaHeart /> {post.likes?.length || 0}
                    </button>
                    <button className="action-btn">
                      <FaComment /> {post.comments?.length || 0}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No posts yet. Be the first to create one!</p>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Community;
