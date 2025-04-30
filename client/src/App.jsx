import { useSelector } from 'react-redux';
import './App.css';
import { Layout } from 'antd';
import DrillDownMap from './components/map/DrillDownMap';
import { MapProvider } from './components/map/MapContext';
import { SidePanel } from './components/sidePanel/SidePanel';
import { FixedHeader } from './components/header/FixedHeader';
import { FixedFooter } from './components/footer/FixedFooter';
import HomePage from './components/home/HomePage';
import PricingPage from './components/pricing/PricingPage';
import ContactPage from './components/contact/ContactPage';
import ProfilePage from './components/profile/ProfilePage';
import { AuthProvider } from './components/login/AuthContext';
import { useState } from 'react';
import { Modal, Tabs } from 'antd';
import Login from './components/login/Login';
import Register from './components/login/Register';

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