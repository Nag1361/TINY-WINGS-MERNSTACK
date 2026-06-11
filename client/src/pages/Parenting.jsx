import React, { useState, useEffect } from 'react';
import { articleService } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import HeroSection from '../components/HeroSection';
import Loader from '../components/Loader';

const Parenting = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParentingArticles();
  }, []);

  const fetchParentingArticles = async () => {
    try {
      setLoading(true);
      const response = await articleService.getArticles('Parenting');
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
        title="Parenting Tips & Advice"
        subtitle="Expert guidance for every stage of parenthood"
      />

      <section className="section">
        <div className="container-fluid">
          <div className="articles-tabs">
            <button className="tab-btn active">Parenting Tips</button>
            <button className="tab-btn">Development</button>
            <button className="tab-btn">Expert Advice</button>
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

export default Parenting;
