import React, { useState } from "react";
import { Button, Form, Input, Checkbox, Radio } from "antd";
import axios from "axios";
import styles from "./Login.module.css";
import { BASE_URL } from "../../reusables/constants";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (props) => {
    setLoading(true);
    const { email, password } = props;

    console.log("Success", props);

    const response = await axios.post(BASE_URL + "/api/student/login", {
      email,
      password,
    });

    console.log(response);

    setLoading(false);
  };

  const handleFailure = (props) => {
    console.log("Failure");
  };

  if (loading) return <div>Loading....</div>;

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
