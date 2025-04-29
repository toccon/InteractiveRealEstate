import { useSelector } from 'react-redux';
import './App.css';
import { Layout } from 'antd';
import DrillDownMap from './map/DrillDownMap';
import { MapProvider } from './map/MapContext';
import { SidePanel } from './sidePanel/SidePanel';
import { FixedHeader } from './header/FixedHeader';
import { FixedFooter } from './footer/FixedFooter';
import HomePage from './home/HomePage';
import PricingPage from './pricing/PricingPage';
import ContactPage from './contact/ContactPage';
import ProfilePage from './profile/ProfilePage';
import { AuthProvider } from './login/AuthContext';
import { useState } from 'react';
import { Modal, Tabs } from 'antd';
import Login from './login/Login';
import Register from './login/Register';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const isSidePanelOpen = useSelector(state => state.sidePanel.open)
  const selectedTab = useSelector(state => state.selectedTab.tabName)

  const displayContent = () => {
    switch (selectedTab) {
      case 'explore':
        return (
          <MapProvider>
            <DrillDownMap />
            {isSidePanelOpen && <SidePanel />}
          </MapProvider>
        );
      case 'home':
        return (
          <div className="home-page-container">
            <HomePage />
          </div>
        );
      case 'pricing':
        return (
          <div className="pricing-page-container">
            <PricingPage openLoginModal={openLoginModal} />
          </div>
        );
      case 'contact':
        return (
          <div className="contact-page-container">
            <ContactPage />
          </div>
        );
      case 'profile':
        return (
          <div className="profile-page-container">
            <ProfilePage />
          </div>
        );
      default:
        return (
          <div>
            <h1>no page matched</h1>
          </div>
        ); 
    }
  }

  return (
    <Layout>
      <AuthProvider>
        <FixedHeader openLoginModal={openLoginModal} />
          {displayContent()}
        <FixedFooter/>
        <Modal
          title="Account Access"
          open={isLoginModalOpen}
          onCancel={closeLoginModal}
          footer={null}
          width={400}
          className="auth-modal"
        >
          <Tabs defaultActiveKey="1" centered className="custom-tabs">
            <Tabs.TabPane tab="Login" key="1">
              <Login onSuccess={closeLoginModal} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Register" key="2">
              <Register onSuccess={closeLoginModal} />
            </Tabs.TabPane>
          </Tabs>
        </Modal>
      </AuthProvider>
    </Layout>
  );
}

export default App;