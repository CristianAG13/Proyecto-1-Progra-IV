import { Menu } from 'antd';
import {
  HomeOutlined,
  RestOutlined,
  UploadOutlined,
  EyeOutlined,
  FormOutlined
} from '@ant-design/icons';
import { Link } from '@tanstack/react-router';

const items = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: 'get',
    icon: <EyeOutlined />,
    label: <Link to="/admin/inventario">Inventario</Link>,
  },
  {
    key: 'create',
    icon: <FormOutlined />,
    label: 'Create Product',
  },
  {
    key: 'update',
    icon: <UploadOutlined />,
    label: 'Update Product',
  },
  {
    key: 'delete',
    icon: <RestOutlined />,
    label: 'Delete Inventory',
  },
];

const MenuList = () => {
  return <Menu theme="dark" mode="inline" items={items} />;
};

export default MenuList;
