import React, { useState } from "react";
import { Button, Form, Input, Checkbox, Radio } from "antd";
import styles from "./Login.module.css";

const Login = () => {
  const handleSubmit = (props) => {
    console.log("Success", props);
  };

  const handleFailure = (props) => {
    console.log("Failure");
  };

  return (
    <div className={styles.root}>
      <Form
        name='basic'
        className={styles.form}
        onFinish={handleSubmit}
        onFinishFailed={handleFailure}
      >
        <Form.Item name='userType'>
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
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit'>Log In</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
