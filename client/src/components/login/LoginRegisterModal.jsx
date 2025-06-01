import React from 'react';
import Login from './Login';
import Register from './Register';
import { Modal, Tabs } from 'antd';

const LoginRegisterModal = ({ onCancel, isLoginModalOpen }) => {

  return (
    <Modal
    title="Account Access"
    open={isLoginModalOpen}
    onCancel={onCancel}
    footer={null}
    width={400}
    className="auth-modal"
  >
    <Tabs defaultActiveKey="1" centered className="custom-tabs">
      <Tabs.TabPane tab="Login" key="1">
        <Login onSuccess={onCancel} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Register" key="2">
        <Register onSuccess={onCancel} />
      </Tabs.TabPane>
    </Tabs>
  </Modal>
  );
};

export default LoginRegisterModal;