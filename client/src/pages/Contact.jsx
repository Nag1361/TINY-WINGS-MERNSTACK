import React, { useState } from 'react';
import { notificationService } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await notificationService.createContact(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="container-fluid">
        <h1>Contact Us</h1>
        <p className="contact-intro">
          Have questions or need support? Get in touch with our team.
        </p>

        <div className="contact-layout">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <span>📧 Email:</span>
              <p>support@tinywings.com</p>
            </div>
            <div className="info-item">
              <span>📞 Phone:</span>
              <p>+91 1234567890</p>
            </div>
            <div className="info-item">
              <span>📍 Address:</span>
              <p>123 Baby Street, Care City, CC 12345</p>
            </div>
            <div className="info-item">
              <span>⏰ Hours:</span>
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {submitted && (
              <div className="alert alert-success">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
