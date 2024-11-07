import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectTab } from '../redux/slices/selectedTabSlice'; 
import { close } from '../redux/slices/sidePanelSlice';
import { Layout, Menu, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import headerLogo from '../images/logos/png/logo-no-background.png';
const { Header } = Layout;

export const FixedHeader = () =>{
  // Create tabs
  const homeTabName = "Home"
  const exploreTabName = "Explore"

  const homeTab = {
    key: homeTabName.toLowerCase(),
    label: homeTabName,
    style: { paddingInline: '5%' },
    onClick: () => handleTabClicked(homeTabName.toLowerCase())
  }

  const exploreTab = {
    key: exploreTabName.toLowerCase(),
    label: exploreTabName,
    style: { paddingInline: '5%' },
    onClick: () => handleTabClicked(exploreTabName.toLowerCase())
  }

  const items = [homeTab, exploreTab]
  
  // When a tab is clicked, set the selected tab in the redux store to render the correct components in App.jsx
  const dispatch = useDispatch()
  const currentSelectedTab = useSelector(state => state.selectedTab.tabName)
  function handleTabClicked(tabName){
    if(tabName !== currentSelectedTab){
      // close side panel if switching from explore tab
      if(currentSelectedTab === 'explore'){
        dispatch(close())
      }
      console.log(tabName)
      dispatch(selectTab(tabName))
    }
  }

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
      }}>
          <img className="header-logo" src={headerLogo} alt="" style={{ height: '50%'}}/>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['explore']} items={items}
          style={{
              flex: 1,
              minWidth: 0,
              paddingInline: '5%'
          }}/>
        {/* Log in button */}
        <Button
          type="primary"
          shape="round"
          icon={<LoginOutlined />}
          size="middle"
          style={{
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            color: '#fff',
            fontWeight: 'bold',
            padding: '0 20px',
          }}
        >
          Login
        </Button>
    </Header>
  )
}