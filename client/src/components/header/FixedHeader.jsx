import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectTab } from '../../redux/slices/selectedTabSlice'; 
import { close } from '../../redux/slices/sidePanelSlice';
import { Layout, Modal, Tabs } from 'antd';
import Login from '../login/Login';      
import Register from '../login/Register'; 
import './FixedHeader.css';

const { Header } = Layout;

export const FixedHeader = ({ openLoginModal }) => {
  const dispatch = useDispatch();
  const currentSelectedTab = useSelector(state => state.selectedTab.tabName);
  const currentUser = null; // Replace with actual user context or state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const homeTabName = "Home";
  const exploreTabName = "Explore";
  const pricingTabName = "Pricing";
  const contactTabName = "Contact";

  function handleTabClicked(tabName) {
    if (tabName !== currentSelectedTab) {
      if (currentSelectedTab === 'explore') {
        dispatch(close());
      }
      dispatch(selectTab(tabName));
    }
  }

  function openLoginModal() {
    setIsModalOpen(true);
  }

  function closeLoginModal() {
    setIsModalOpen(false);
  }

  function handleAuthSuccess() {
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(selectTab('explore'));
    }, 500); // 0.5s delay
  }

  return (
    <>
      <Header className="fixed-header">
        <img
          className="header-logo"
          src="/images/logos/png/logo-no-background.png"
          alt="Logo"
          style={{ cursor: 'pointer' }}
          onClick={() => handleTabClicked(homeTabName.toLowerCase())}
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

        {currentUser ? (
          <div className="profile-avatar" onClick={() => handleTabClicked('profile')}>
            <img
              src="/images/avatars/avatar-placeholder.png" // replace later with real avatar if available
              alt="Profile"
            />
          </div>
        ) : (
          <button className="login-button" onClick={openLoginModal}>
            Login / Register
          </button>
        )}
      </Header>

      <Modal
        title=""
        open={isModalOpen}
        onCancel={closeLoginModal}
        footer={null}
        width={400}
        className="auth-modal"
      >
        <Tabs defaultActiveKey="1" centered className="custom-tabs">
          <Tabs.TabPane tab="Login" key="1">
            <div className="auth-form-wrapper">
              <Login onSuccess={handleAuthSuccess} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="2">
            <div className="auth-form-wrapper">
              <Register onSuccess={handleAuthSuccess} />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
