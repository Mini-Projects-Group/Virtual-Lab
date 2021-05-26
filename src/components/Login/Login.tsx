import React, { useState } from "react";
import { Button, Form, Input, Checkbox, Radio, Alert } from "antd";
import axios from "axios";
import styles from "./Login.module.css";

import { useDispatch, useSelector } from "react-redux";
import { login_user } from "../../redux/action";
import { BAD_STATUS } from "../../redux";
import { Redirect } from "react-router-dom";
import { AppState } from "../../redux/reducer";

const Login = () => {
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const error = useSelector((state: AppState) => state.errorReducer?.msg);

  const handleSubmit = async (props) => {
    const { email, password } = props;
    setLoading(true);

    const response = await dispatch(login_user(email, password));

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

  if (redirect) return <Redirect to='/auth' />;

  return (
    <div className={styles.root}>
      <Form
        name='basic'
        className={styles.form}
        onFinish={handleSubmit}
        onFinishFailed={handleFailure}
      >
        {error && <Alert message='Invalid Credentials' type='error' />}
        <Form.Item
          name='userType'
          rules={[{ required: true, message: "Please select a user type!" }]}
        >
          <Radio.Group>
            <Radio value='faculty'>Faculty</Radio>
            <Radio value='student'>Student</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name='email'
          label='Email ID'
          rules={[{ required: true, message: "Email ID cannot be empty!" }]}
        >
          <Input type='email' />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[{ required: true, message: "Password cannot be empty!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox defaultChecked={false}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' loading={loading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
