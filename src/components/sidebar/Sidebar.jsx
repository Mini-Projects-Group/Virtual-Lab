import { Layout, Menu } from "antd";
import React from "react";
const { Header, Content, Sider } = Layout;

const Sidebar = () => {
  return (
    <div>
      <Layout>
        {/* <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
          >
            Sidebar
          </Menu>
        </Sider> */}
        Auth
      </Layout>
    </div>
  );
};

export default Sidebar;
