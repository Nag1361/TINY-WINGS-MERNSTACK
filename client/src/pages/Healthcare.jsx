import React, { useState, useEffect } from 'react';
import { articleService } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import HeroSection from '../components/HeroSection';
import Loader from '../components/Loader';

const Healthcare = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthcareArticles();
  }, []);

  const fetchHealthcareArticles = async () => {
    try {
      setLoading(true);
      const response = await articleService.getArticles('Healthcare');
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection
        title="Child Healthcare Guide"
        subtitle="Expert-backed healthcare information for your baby"
      />

      <section className="section">
        <div className="container-fluid">
          <div className="articles-tabs">
            <button className="tab-btn active">Healthcare</button>
            <button className="tab-btn">Nutrition</button>
            <button className="tab-btn">Vaccination</button>
          </div>

          {!loading ? (
            <>
              {articles.length > 0 ? (
                <div className="articles-grid">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      onRead={() => console.log('Read article')}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-data">No articles found</p>
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </div>
  );
};

export default Healthcare;
