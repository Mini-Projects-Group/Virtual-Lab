import React, { useReducer, useState } from "react";
import { Layout, Menu } from "antd";
import {
  FileOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { WHITE } from "../../reusables/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/reducer";
import { useHistory } from "react-router";
import Team from "../Team/Team";
import Files from "../Files/Files";

const { Header, Sider, Content } = Layout;

const StudentDashboard = () => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState<any>("team");

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
        <Menu theme='dark' defaultSelectedKeys={["team"]} mode='inline'>
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
          <Menu.Item key='10' icon={<LogoutOutlined />} onClick={handleLogout}>
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

export default StudentDashboard;
