import React from 'react';
import './ArticleCard.css';

const ArticleCard = ({ article, onRead }) => {
  return (
    <div className="article-card">
      {article.image?.url && (
        <div className="article-image">
          <img src={article.image.url} alt={article.title} />
        </div>
      )}
      <div className="article-content">
        <span className="category-badge">{article.category}</span>
        <h3>{article.title}</h3>
        <p className="description">{article.description}</p>
        <div className="article-footer">
          <small>{article.author?.name}</small>
          <button onClick={onRead} className="read-btn">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
