import {
  FileOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AppState } from "../../redux/reducer";
import { WHITE } from "../../reusables/constants";
import Files from "../Files/Files";
import Team from "../Team/Team";

const { Header, Sider, Content } = Layout;

const TeacherDashboard = () => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const [selectedOption, setSelectedOption] = useState<any>("");

  console.log(selectedOption);

  const history = useHistory();
  const dispatch = useDispatch();

  const toggle = () => {
    setState((prev) => {
      return {
        collapsed: !prev.collapsed,
      };
    });
  };

  const handleLogout = async () => {
    await dispatch({
      type: "LOGOUT_SUCCESS",
    });

    history.push("/");
  };

  const name = useSelector(
    (state: AppState) => state.userReducer?.userData?.name
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div
          className='logo'
          style={{
            display: "flex",
            color: WHITE,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {name}
        </div>
        <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
          <Menu.Item
            key='team'
            icon={<TeamOutlined />}
            onClick={(e) => setSelectedOption(e.key)}
          >
            Team
          </Menu.Item>
          <Menu.Item
            key='files'
            icon={<FileOutlined />}
            onClick={(e) => setSelectedOption(e.key)}
          >
            Files
          </Menu.Item>
          <Menu.Item
            key='logout'
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: "10px" }}>
          {React.createElement(
            state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 2080,
            background: "green",
            marginLeft: "200px",
          }}
        >
          {selectedOption === "team" ? (
            <Team />
          ) : selectedOption === "files" ? (
            <Files />
          ) : (
            "Dashboard Dashboard"
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherDashboard;
