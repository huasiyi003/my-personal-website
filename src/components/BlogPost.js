import React from 'react';
import './BlogPost.css';

function BlogPost({ post, onBack }) {
  if (!post) return null;
  
  return (
    <div className="blog-post-detail">
      <button className="back-button" onClick={onBack}>返回</button>
      <h2>{post.title}</h2>
      <div className="post-date">{post.date}</div>
      <div className="post-content">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default BlogPost; 