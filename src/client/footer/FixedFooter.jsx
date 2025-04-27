import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export const FixedFooter = () =>{
    return (
        <Footer
        style={{
            width: '100%',
            textAlign: 'center',
            color: '#888',
            height: '5vh',
            background: '#f9f9f9',
            borderTop: '1px solid #eee',
          }}>
            RealMap ©{new Date().getFullYear()} Created by Nicholas Tocco
        </Footer>
    )
}