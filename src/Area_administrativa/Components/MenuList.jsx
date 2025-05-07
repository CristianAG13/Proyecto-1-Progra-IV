import { Menu } from 'antd';
import { HomeOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';

const items = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: <Link to="/admin/welcome">Home</Link>,
  },
  {
    key: 'get',
    icon: <EyeOutlined />,
    label: <Link to="/admin/inventario">Inventario</Link>,
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
