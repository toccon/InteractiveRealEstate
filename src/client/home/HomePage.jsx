import React from 'react';
import { useDispatch } from "react-redux";
import { selectTab } from '../redux/slices/selectedTabSlice'; 
import homePageStrings from '../constants/homePageStrings';
import './HomePage.css';

const HomePage = () => {
  const { hero, whatIsRealMap, howItWorks } = homePageStrings;
  const dispatch = useDispatch();

  return (
    <div className="home-container">
      <section className="hero-section">
        {/* Background Video */}
        <video className="background-video" autoPlay muted loop playsInline>
          <source src="/videos/home-intro-1080.mp4" type="video/mp4" />
          {/* Fallback Image */}
          <img src="/images/background/real-estate-background.jpeg" alt="Real estate" className="background-fallback" />
        </video>

        {/* Dark overlay for better text contrast */}
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          <button
            className="explore-button"
            onClick={() => dispatch(selectTab('explore'))}
          >
            {hero.buttonText}
          </button>
        </div>
      </section>

      <section className="info-section">
        <h2>{whatIsRealMap.title}</h2>
        <p>{whatIsRealMap.description}</p>
        <ul>
          {whatIsRealMap.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="how-it-works-section">
        <h2>{howItWorks.title}</h2>
        <div className="steps">
          {howItWorks.steps.map((step, index) => (
            <div className="step" key={index}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
