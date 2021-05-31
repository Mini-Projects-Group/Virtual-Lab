import { FileOutlined, LogoutOutlined, CloseOutlined } from "@ant-design/icons";
import { Layout, Menu, Upload, Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AppState } from "../../redux/reducer";
import { LIGHT1, PRIMARY, WHITE, LIGHT2 } from "../../reusables/constants";

import { async_func_data } from "../../redux/utils/helperfunctions";
import { UploadOutlined } from "@ant-design/icons";
import firebase from "../../firebase";
import { DownloadOutlined } from "@ant-design/icons";

import styles from "./Lab.module.css";

const { Sider, Content } = Layout;

const Lab = (props) => {
  const { labId } = props?.match.params;

  const [labData, setLabData] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");

  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      const labs = await async_func_data(
        "/api/labs/getLab",
        { id: labId },
        "get",
        true
      );

      // console.log(labs);

      setLabData(labs.data.labData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const storage = firebase.storage();

      const storageRef = await storage.ref();

      const labItems = await storageRef.child(`${labId}`).listAll();

      labItems.items.forEach(async (itemRef) => {
        const imgURL = await storageRef
          .child(itemRef.fullPath)
          .getDownloadURL();

        //console.log(itemRef);

        setResources((prev) => [...prev, { url: imgURL, name: itemRef.name }]);
        //console.log(imgURL);
      });
    })();

    // clean up function
    return () => {
      setResources([]);
    };
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();

  const [page, setPage] = useState("0");

  const handleLeave = async () => {
    history.goBack();
  };

  const name = useSelector(
    (state: AppState) => state.userReducer?.userData?.name
  );

  const type = useSelector(
    (state: AppState) => state.userReducer?.userData?.type
  );

  const handleLogout = async () => {
    await dispatch({
      type: "LOGOUT_SUCCESS",
    });

    history.push("/");
  };

  const handleChange = (info) => {
    //console.log(info);
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   getBase64(info.file.originFileObj, (imageUrl) =>
    //     this.setState({
    //       imageUrl,
    //       loading: false,
    //     })
    //   );
    // }
  };

  const beforeUpload = (file) => {
    //console.log(file);
    // const isImage = file.type.indexOf("image/") === 0;
    // if (!isImage) {
    //   alert("You can only upload image file!");
    // }
    // // You can remove this validation if you want
    // const isLt5M = file.size / 1024 / 1024 < 5;
    // if (!isLt5M) {
    //   alert("Image must smaller than 5MB!");
    // }
    // return isImage && isLt5M;
  };

  const customUpload = async (data) => {
    console.log(data);
    const { onSuccess, onError, file } = data;

    const storage = firebase.storage();
    const metadata = {
      contentType: file.type,
    };
    const storageRef = await storage.ref();

    const fName = file.name;

    const imgFile = storageRef.child(`${labId}/${fName}`);
    try {
      const image = await imgFile.put(file, metadata);
      onSuccess(null, image);

      const url = await imgFile.getDownloadURL();
      //console.log("URL", url);

      // const postURL = await async_func_data()
    } catch (e) {
      onError(e);
    }
  };

  const handleDownload = (item) => {
    // Download(item.url);
    window.location.href = item.url;
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
        <Menu
          theme='dark'
          defaultSelectedKeys={["0"]}
          mode='inline'
          onClick={(i) => {
            setPage(i.key as string);
          }}
        >
          <Menu.Item
            key='0'
            icon={
              <FileOutlined style={{ color: page === "0" ? PRIMARY : WHITE }} />
            }
          >
            Files
          </Menu.Item>
          <Menu.Item key='1' icon={<CloseOutlined />} onClick={handleLeave}>
            Leave Lab
          </Menu.Item>
          <Menu.Item key='2' icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content
          className='site-layout-background'
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 2080,
            marginLeft: "200px",
          }}
        >
          {page === "0" ? (
            <>
              {type === "faculty" ? (
                <Upload
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  customRequest={customUpload}
                  name='file-upload'
                  action='gs://virtual-lab-storage.appspot.com'
                  // headers={{ authorization: "authorization-text" }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              ) : null}
              <div className={styles.resourcesParent}>
                {resources.length ? (
                  resources?.map((item, idx) => (
                    <div
                      key={idx}
                      className={styles.resourceCard}
                      style={{ background: LIGHT2 }}
                    >
                      <p className={styles.cardTitle}>{item.name}</p>
                      <DownloadOutlined
                        onClick={() => handleDownload(item)}
                        style={{ cursor: "pointer", fontSize: "150%" }}
                      />
                    </div>
                  ))
                ) : (
                  <Spin />
                )}
              </div>
            </>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Lab;
