import { Menu } from 'antd';
import {HomeOutlined, RestOutlined,UploadOutlined,EyeOutlined,FormOutlined} from '@ant-design/icons';

const MenuList = () => {

    return <Menu theme="dark"> 
        
        <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
        </Menu.Item>

        <Menu.Item key="get" icon={<EyeOutlined />}>
            Get inventory
        </Menu.Item>

        <Menu.Item key="create" icon={<FormOutlined/>}>
            Create Product
        </Menu.Item>

        <Menu.Item key="update" icon={<UploadOutlined />}>
            Update Product
        </Menu.Item>

        <Menu.Item key="delate" icon={<RestOutlined />}>
           Delate Inventory
        </Menu.Item>

    </Menu>;





};

export default MenuList;