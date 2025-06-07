import { Menu } from 'antd';
import { HomeOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';

const items = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: <Link to="/admin/welcome">Home</Link>,
  },
  {
    key: 'Gestion de usuarios',
    icon: <UserOutlined />,
    label: <Link to="/admin/usuarios">Usuarios</Link>,
  },
];

const MenuList = () => {
  return (
    <Menu 
      theme="dark" 
      mode="inline" 
      items={items} 
    />
  );
};

export default MenuList;
