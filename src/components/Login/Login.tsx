import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Checkbox,
  Radio,
  Alert,
  Modal,
  notification,
} from "antd";
import axios from "axios";
import styles from "./Login.module.css";

import { useDispatch, useSelector } from "react-redux";
import { login_user } from "../../redux/action";
import { BAD_STATUS } from "../../redux";
import { Redirect } from "react-router-dom";
import { AppState } from "../../redux/reducer";
import { async_func_data } from "../../redux/utils/helperfunctions";

const Login = () => {
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotType, setForgotType] = useState("");

  const [userType, setUserType] = useState("");

  const error = useSelector((state: AppState) => state.errorReducer?.msg);

  const handleSubmit = async (props) => {
    const { email, password, userType } = props;

    setUserType(userType);
    //console.log(userType);

    setLoading(true);

    const response = await dispatch(login_user(email, password, userType));

    setLoading(false);
    if (
      (response as any)?.status !== BAD_STATUS &&
      !(response as any)?.data.error
    ) {
      setRedirect(true);
    }
  };

  const handleFailure = (props) => {
    console.log("Failure");
  };

  const handleForgot = () => {
    setIsModalVisible(true);
  };

  const confirmForgot = async (e) => {
    // console.log(forgotEmail, forgotType);

    // API call
    const response = await async_func_data(
      "/api/user/forgotPassword",
      { email: forgotEmail, type: forgotType },
      "post",
      false
    );

    console.log(response);

    setIsModalVisible(false);

    if (response.data.error) {
      notification["error"]({
        message: "Wrong Type",
        description: response.data?.message,

        duration: 10,
      });
    } else {
      notification["success"]({
        message: "Email Sent",
        description:
          "A link to reset your password has been sent to your email. Please check your inbox.",

        duration: 10,
      });
    }

    setForgotEmail("");
    setForgotType("");
  };

  if (redirect)
    return userType === "student" ? (
      <Redirect to="/sdashboard" />
    ) : (
      <Redirect to="/fdashboard" />
    );

  return (
    <div className={styles.root}>
      <Form
        name="basic"
        className={styles.form}
        onFinish={handleSubmit}
        onFinishFailed={handleFailure}
      >
        {error && <Alert message="Invalid Credentials" type="error" />}
        <Form.Item
          name="userType"
          rules={[{ required: true, message: "Please select a user type!" }]}
        >
          <Radio.Group>
            <Radio value="faculty">Faculty</Radio>
            <Radio value="student">Student</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email ID"
          rules={[{ required: true, message: "Email ID cannot be empty!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password cannot be empty!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox defaultChecked={false}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" loading={loading}>
            Log In
          </Button>
        </Form.Item>

        <div onClick={handleForgot} className={styles.forgotText}>
          Forgot Password ?
        </div>
        <Modal
          title="Forgot Password"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={confirmForgot}
        >
          <div className={styles.forgotModal}>
            <Radio.Group
              value={forgotType}
              onChange={(e) => setForgotType(e.target.value)}
            >
              <Radio value="faculty">Faculty</Radio>
              <Radio value="student">Student</Radio>
            </Radio.Group>
          </div>
          Enter the email ID linked with the account.
          <Input
            placeholder="Enter Email ID"
            name="forgot-email"
            value={forgotEmail}
            onChange={(email) => setForgotEmail(email.target.value)}
            type="email"
          />
        </Modal>
      </Form>
    </div>
  );
};

export default Login;
