import React from 'react';
import blogPosts from '../data/blogPosts';
import './BlogList.css';

function BlogList({ onReadMore }) {
  return (
    <div className="blog-list">
      <h2>我的日记</h2>
      <div className="blog-posts">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-post">
            <h3>{post.title}</h3>
            <div className="post-date">{post.date}</div>
            <p className="post-summary">{post.summary}</p>
            <button 
              className="read-more" 
              onClick={() => onReadMore(post.id)}
            >
              阅读全文
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList; 