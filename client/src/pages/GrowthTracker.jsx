import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { growthService, childService } from '../services/api';
import Loader from '../components/Loader';

const GrowthTracker = () => {
  const { childId } = useParams();
  const [child, setChild] = useState(null);
  const [growthRecords, setGrowthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, [childId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const childRes = await childService.getChildById(childId);
      const recordsRes = await growthService.getGrowthRecords(childId);
      
      setChild(childRes.data.child);
      setGrowthRecords(recordsRes.data.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await growthService.addGrowthRecord(childId, formData);
      setFormData({ height: '', weight: '', notes: '' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async (recordId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await growthService.deleteGrowthRecord(recordId);
        fetchData();
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="growth-tracker-container">
      <div className="container-fluid">
        <h1>Growth Tracker - {child?.childName}</h1>

        <div className="growth-stats">
          <div className="stat-item">
            <label>Current Height</label>
            <p>{child?.height || 0} cm</p>
          </div>
          <div className="stat-item">
            <label>Current Weight</label>
            <p>{child?.weight || 0} kg</p>
          </div>
        </div>

        <div className="growth-section">
          <div className="section-header">
            <h2>Growth Records</h2>
            <button
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add Record'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="growth-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    step="0.1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    step="0.1"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn-submit">
                Add Record
              </button>
            </form>
          )}

          <div className="records-table">
            {growthRecords.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Height (cm)</th>
                    <th>Weight (kg)</th>
                    <th>Notes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {growthRecords.map((record) => (
                    <tr key={record._id}>
                      <td>{new Date(record.recordDate).toLocaleDateString()}</td>
                      <td>{record.height}</td>
                      <td>{record.weight}</td>
                      <td>{record.notes || '-'}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(record._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No growth records yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;
