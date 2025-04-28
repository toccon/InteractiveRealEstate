import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectTab } from '../redux/slices/selectedTabSlice'; 
import { close } from '../redux/slices/sidePanelSlice';
import { Layout } from 'antd';
import './FixedHeader.css'; // <-- We'll use a small custom CSS file

const { Header } = Layout;

export const FixedHeader = () => {
  const dispatch = useDispatch();
  const currentSelectedTab = useSelector(state => state.selectedTab.tabName);

  const homeTabName = "Home";
  const exploreTabName = "Explore";
  const pricingTabName = "Pricing";
  const contactTabName = "Contact"
  function handleTabClicked(tabName) {
    if (tabName !== currentSelectedTab) {
      if (currentSelectedTab === 'explore') {
        dispatch(close());
      }
      dispatch(selectTab(tabName));
    }
  }

  return (
    <Header className="fixed-header">
      <img
        className="header-logo"
        src="/images/logos/png/logo-no-background.png"
        alt="Logo"
      />

      <nav className="header-tabs">
        <div
          className={`tab-item ${currentSelectedTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabClicked(homeTabName.toLowerCase())}
        >
          {homeTabName}
        </div>
        <div
          className={`tab-item ${currentSelectedTab === 'explore' ? 'active' : ''}`}
          onClick={() => handleTabClicked(exploreTabName.toLowerCase())}
        >
          {exploreTabName}
        </div>
        <div
          className={`tab-item ${currentSelectedTab === 'pricing' ? 'active' : ''}`}
          onClick={() => handleTabClicked(pricingTabName.toLowerCase())}
        >
          {pricingTabName}
        </div>
        <div
          className={`tab-item ${currentSelectedTab === 'contact' ? 'active' : ''}`}
          onClick={() => handleTabClicked(contactTabName.toLowerCase())}
        >
          {contactTabName}
        </div>
      </nav>

      <button className="login-button">
        Login
      </button>
    </Header>
  );
};
