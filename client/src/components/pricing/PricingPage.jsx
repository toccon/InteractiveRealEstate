import React from 'react';
import { useDispatch } from 'react-redux';
import { selectTab } from '../../redux/slices/selectedTabSlice'; 
import { message } from 'antd'; // For toast
import pricingPageStrings from '../constants/pricingPageStrings';
import './PricingPage.css';
import { useAuth } from '../login/AuthContext';

const PricingPage = ({ openLoginModal }) => { 
  const dispatch = useDispatch();
  const { user } = useAuth(); 
  const { title, subtitle, tiers } = pricingPageStrings;

  const handleUpgradeClick = () => {
    if (!user) {
      openLoginModal();
      message.info('You must be logged in to subscribe.');
    } else {
      // Later you could send them to payment page here
      message.success('Coming soon: Subscription flow!');
    }
  };

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
            {tier.title === 'Free' ? (
              <button
                className="select-button"
                onClick={() => dispatch(selectTab('explore'))}
              >
                {tier.buttonText}
              </button>
            ) : (
              <button
                className="select-button"
                onClick={handleUpgradeClick}
              >
                {tier.buttonText}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
