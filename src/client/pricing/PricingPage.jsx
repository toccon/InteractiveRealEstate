import React from 'react';
import pricingPageStrings from '../constants/pricingPageStrings'; // Adjust the path if needed
import './PricingPage.css';

const PricingPage = () => {
  const { title, subtitle, tiers } = pricingPageStrings;

  return (
    <div className="pricing-container">
      <h1 className="pricing-title">{title}</h1>
      <p className="pricing-subtitle">{subtitle}</p>

      <div className="pricing-tiers">
        {tiers.map((tier, index) => (
          <div key={index} className="pricing-card">
            <h2>{tier.title}</h2>
            <p className="price">${tier.price}<span>/mo</span></p>
            <p className="description">{tier.description}</p>
            <ul className="feature-list">
              {tier.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="select-button">{tier.buttonText}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
