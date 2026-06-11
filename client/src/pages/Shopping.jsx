import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const categories = [
    'Baby Care',
    'Clothing',
    'Footwear',
    'Toys',
    'Feeding',
    'Diapers',
    'Healthcare',
    'Books',
    'Accessories',
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts(
        selectedCategory,
        searchTerm,
        page,
        12
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shopping-container">
      <div className="container-fluid">
        <h1>Shop Baby Products</h1>

        <div className="shopping-layout">
          {/* Sidebar */}
          <aside className="shopping-sidebar">
            <div className="filter-section">
              <h4>Categories</h4>
              <div className="category-filters">
                <button
                  className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory('');
                    setPage(1);
                  }}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setPage(1);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Search</h4>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="search-input"
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="products-section">
            {!loading ? (
              <>
                {products.length > 0 ? (
                  <div className="products-grid">
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        onAddCart={() => console.log('Add to cart')}
                        onViewDetails={() => console.log('View details')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-products">
                    <p>No products found</p>
                  </div>
                )}
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
