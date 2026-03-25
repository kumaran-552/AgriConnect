import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <p>Hello, {currentUser?.email}!</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>My Listings</h3>
            <p>Manage your product and livestock listings</p>
            <div className="card-stats">
              <span className="stat-number">0</span>
              <span className="stat-label">Active Listings</span>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>My Queries</h3>
            <p>Track your expert consultation requests</p>
            <div className="card-stats">
              <span className="stat-number">0</span>
              <span className="stat-label">Pending Queries</span>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Saved Items</h3>
            <p>Items you've bookmarked for later</p>
            <div className="card-stats">
              <span className="stat-number">0</span>
              <span className="stat-label">Saved Items</span>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Update your account information</p>
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <p className="no-activity">No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
