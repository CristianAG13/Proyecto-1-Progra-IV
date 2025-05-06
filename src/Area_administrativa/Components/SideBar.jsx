import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import Logo from './Logo';
import MenuList from './MenuList';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} className="sidebar">
            <Logo />
            <MenuList />
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ marginTop: '1rem', color: '#fff' }}
            />
        </Sider>
    );
};

export default SideBar;
