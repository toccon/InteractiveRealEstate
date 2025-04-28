import React, { useState } from 'react';
import contactPageStrings from '../constants/contactPageStrings';
import './ContactPage.css';

const ContactPage = () => {
  const { title, subtitle, faqTitle, faqs, form } = contactPageStrings;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [expandedFAQIndex, setExpandedFAQIndex] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear errors while typing
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: Handle form submission (e.g., send data to server)
    console.log('Form submitted:', formData);
    alert('Thank you for your feedback!');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  const toggleFAQ = (index) => {
    setExpandedFAQIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">{title}</h1>
      <p className="contact-subtitle">{subtitle}</p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={form.namePlaceholder}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}

          <input
            type="email"
            name="email"
            placeholder={form.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}

          <textarea
            name="message"
            placeholder={form.messagePlaceholder}
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <div className="error-message">{errors.message}</div>}

          <button type="submit">{form.submitButton}</button>
        </form>
      </div>

      <div className="faq-section">
        <h2>{faqTitle}</h2>
        <div className="faqs">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 onClick={() => toggleFAQ(index)} className="faq-question">
                {faq.question}
              </h3>
              <div className={`faq-answer ${expandedFAQIndex === index ? 'expanded' : ''}`}>
                {expandedFAQIndex === index && <p>{faq.answer}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
