import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import Logo from './Logo';
import MenuList from './MenuList';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header, Sider } = Layout;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <Sider collapsible collapsed={collapsed} className="sidebar">
                <Logo />
                <MenuList />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: '0 16px' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapsed}
                    />
                </Header>
            </Layout>
        </Layout>
    );
};

export default SideBar;
