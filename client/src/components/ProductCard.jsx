import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product, onAddCart, onViewDetails }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image?.url ? (
          <img src={product.image.url} alt={product.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
        {product.stock === 0 && <span className="out-of-stock">Out of Stock</span>}
        {product.featured && <span className="featured-badge">Featured</span>}
      </div>
      <div className="product-info">
        <h4>{product.name}</h4>
        <div className="product-rating">
          <FaStar className="star" />
          <span>{product.rating || 0}</span>
        </div>
        <p className="product-price">₹{product.price}</p>
        <div className="product-actions">
          <button
            onClick={onViewDetails}
            className="view-btn"
          >
            View Details
          </button>
          <button
            onClick={onAddCart}
            disabled={product.stock === 0}
            className="cart-btn"
          >
            <FaShoppingCart /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
