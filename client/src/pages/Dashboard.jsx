import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { childService, growthService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    gender: '',
    dateOfBirth: '',
    bloodGroup: '',
    skinTone: '',
  });

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await childService.getChildren();
      setChildren(response.data.children);
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await childService.createChild(formData);
      setFormData({
        childName: '',
        gender: '',
        dateOfBirth: '',
        bloodGroup: '',
        skinTone: '',
      });
      setShowForm(false);
      fetchChildren();
    } catch (error) {
      console.error('Error creating child:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-container">
      <div className="container-fluid">
        <h1>Welcome, {user?.name}!</h1>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'children' ? 'active' : ''}`}
            onClick={() => setActiveTab('children')}
          >
            My Children
          </button>
          <button
            className={`tab-btn ${activeTab === 'growth' ? 'active' : ''}`}
            onClick={() => setActiveTab('growth')}
          >
            Growth Tracker
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="dashboard-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{children.length}</h3>
                <p>Children Added</p>
              </div>
              <div className="stat-card">
                <h3>{children.reduce((acc, child) => acc + child.growthRecords?.length || 0, 0)}</h3>
                <p>Growth Records</p>
              </div>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Profile Complete</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'children' && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>My Children</h2>
              <button
                className="btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Cancel' : '+ Add Child'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="add-child-form">
                <div className="form-group">
                  <label>Child Name</label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Skin Tone</label>
                    <input
                      type="text"
                      name="skinTone"
                      value={formData.skinTone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-submit">
                  Add Child
                </button>
              </form>
            )}

            <div className="children-list">
              {children.length > 0 ? (
                children.map((child) => (
                  <div key={child._id} className="child-card">
                    <div className="child-info">
                      <h4>{child.childName}</h4>
                      <p>Gender: {child.gender}</p>
                      <p>Height: {child.height} cm | Weight: {child.weight} kg</p>
                    </div>
                    <button
                      className="btn-secondary"
                      onClick={() => navigate(`/growth-tracker/${child._id}`)}
                    >
                      View Growth
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-data">No children added yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
