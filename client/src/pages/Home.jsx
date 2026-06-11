import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ArticleCard from '../components/ArticleCard';
import ProductCard from '../components/ProductCard';
import { articleService, productService } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesRes = await articleService.getArticles();
        const productsRes = await productService.getProducts();
        
        setArticles(articlesRes.data.articles.slice(0, 3));
        setProducts(productsRes.data.products.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { name: 'Baby Care', icon: '🍼' },
    { name: 'Clothing', icon: '👕' },
    { name: 'Toys', icon: '🧸' },
    { name: 'Healthcare', icon: '💊' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Tiny Wings"
        subtitle="Your complete platform for baby growth, parenting, healthcare & shopping"
        ctaText="Get Started"
        onCTA={() => navigate('/dashboard')}
      />

      {/* Features Section */}
      <section className="section">
        <div className="container-fluid">
          <h2 className="section-title">Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Growth Tracking</h3>
              <p>Monitor your baby's height and weight growth with detailed charts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Expert Articles</h3>
              <p>Learn from healthcare and parenting experts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h3>Shopping</h3>
              <p>Browse and buy premium baby products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Community</h3>
              <p>Connect with other parents and share experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section category-section">
        <div className="container-fluid">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="category-item"
                onClick={() => navigate(`/shop?category=${cat.name}`)}
              >
                <span className="category-emoji">{cat.icon}</span>
                <p>{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="section">
        <div className="container-fluid">
          <h2 className="section-title">Latest Articles</h2>
          {!loading ? (
            <div className="articles-grid">
              {articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  onRead={() => navigate(`/article/${article._id}`)}
                />
              ))}
            </div>
          ) : (
            <p>Loading articles...</p>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        <div className="container-fluid">
          <h2 className="section-title">Featured Products</h2>
          {!loading ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddCart={() => console.log('Add to cart:', product._id)}
                  onViewDetails={() => navigate(`/product/${product._id}`)}
                />
              ))}
            </div>
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
