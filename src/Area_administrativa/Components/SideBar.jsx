import React, { useState } from 'react';
import { Layout } from 'antd';
import Logo from './Logo';
import MenuList from './MenuList';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '@/services/AuthService';

const { Sider } = Layout;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            window.location.href = '/';
        } else {
            alert("No se pudo cerrar sesión. Intenta de nuevo.");
        }
    };

    return (
        <Sider collapsible collapsed={collapsed} className="sidebar">
            <Logo />
            <MenuList />
            <div className="absolute bottom-16 w-full px-4">
                <button
                    className="flex items-center justify-center w-full py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    onClick={handleLogout}
                >
                    <LogoutOutlined className="mr-2" />
                    {!collapsed && <span>Cerrar Sesión</span>}
                </button>
            </div>
            <button
                className="flex items-center justify-center w-full mt-4 text-white bg-transparent hover:bg-blue-800/30 py-2 transition-colors"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
        </Sider>
    );
};

export default SideBar;
