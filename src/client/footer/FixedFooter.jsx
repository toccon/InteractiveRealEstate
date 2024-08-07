import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export const FixedFooter = () =>{
    return (
        <Footer
            style={{
                textAlign: 'center',
                height: '5vh'
            }}
        >
            RealMap ©{new Date().getFullYear()} Created by Nicholas Tocco
        </Footer>
    )
}