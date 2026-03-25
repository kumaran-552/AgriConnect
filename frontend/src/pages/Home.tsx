import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>AgriConnect</h1>
            <p>
              Empowering farmers and rural entrepreneurs with comprehensive
              agricultural guidance, marketplace access, and expert consultation.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/agriculture" className="btn btn-secondary btn-large">
                Explore Services
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">🌾</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Our Services</h2>
          <p className="features-subtitle">
            Comprehensive solutions for modern agriculture and rural development
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Agriculture</h3>
              <p>
                Disease management, crop guidance, and farming best practices
              </p>
              <Link to="/agriculture" className="feature-link">
                Learn More
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Horticulture</h3>
              <p>Plant exchange platform and training resources</p>
              <Link to="/horticulture" className="feature-link">
                Learn More
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🐔</div>
              <h3>Poultry</h3>
              <p>Guides for raising ducks, hens, and egg production</p>
              <Link to="/poultry" className="feature-link">
                Learn More
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Products</h3>
              <p>Farm supplies, fertilizers, tools, and equipment</p>
              <Link to="/products" className="feature-link">
                Learn More
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🐄</div>
              <h3>Livestock</h3>
              <p>Buy and sell animals, livestock marketplace</p>
              <Link to="/livestock" className="feature-link">
                Learn More
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👨‍🌾</div>
              <h3>Expert Consultation</h3>
              <p>Get professional guidance from agricultural experts</p>
              <Link to="/experts" className="feature-link">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Farmers Helped</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Products Listed</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Expert Consultants</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Transform Your Farming?</h2>
          <p>
            Join thousands of farmers who are already benefiting from our
            platform
          </p>
          <Link to="/register" className="btn btn-primary btn-large">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
