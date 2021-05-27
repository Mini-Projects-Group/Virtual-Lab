import { FileOutlined, LogoutOutlined, CloseOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AppState } from "../../redux/reducer";
import { PRIMARY, WHITE } from "../../reusables/constants";

const { Sider, Content } = Layout;

const Lab = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [page, setPage] = useState("0");

  const handleLeave = async () => {
    history.goBack();
  };

  const name = useSelector(
    (state: AppState) => state.userReducer?.userData?.name
  );

  const handleLogout = async () => {
    await dispatch({
      type: "LOGOUT_SUCCESS",
    });

    history.push("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            color: WHITE,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {name}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
          mode="inline"
          onClick={(i) => {
            setPage(i.key as string);
          }}
        >
          <Menu.Item
            key="0"
            icon={
              <FileOutlined style={{ color: page === "0" ? PRIMARY : WHITE }} />
            }
          >
            Files
          </Menu.Item>
          <Menu.Item key="1" icon={<CloseOutlined />} onClick={handleLeave}>
            Leave Lab
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 2080,
          }}
        >
          {page === "0" ? (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              corporis quo delectus, rerum deleniti quos, excepturi sint odio
              fugiat omnis dolorum eaque natus fugit labore recusandae sed culpa
              totam quisquam?
            </p>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Lab;
