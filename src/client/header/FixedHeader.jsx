import React from 'react';
import { Layout, Menu } from 'antd';
import headerLogo from '../images/logos/png/logo-no-background.png';
const { Header } = Layout;

const labels = ['Home', 'Explore', 'Contact', 'Pricing'];

const items = labels.map((label) => ({
  key: label.toLowerCase(),
  label: label,
  style: { paddingInline: '5%' }
}));

export const FixedHeader = () =>{
    return (
        <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          height: '5vh',
          lineHeight: '5vh',
          display: 'flex',
          alignItems: 'center',
          background: '#ffffff'
        }}
      >
            <img className="header-logo" src={headerLogo} alt=""
            style={{
                height: '50%'
            }}/>
            <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['explore']}
            items={items}
            style={{
                flex: 1,
                minWidth: 0,
                paddingInline: '5%'
            }}
            />
      </Header>
    )
}