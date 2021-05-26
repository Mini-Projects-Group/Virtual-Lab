import { Button, Form, Input, notification } from "antd";
import Query from "query-string";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { async_func_data } from "../../redux/utils/helperfunctions";
import styles from "./FPassword.module.css";

const ForgotPassword = (props) => {
  const { email } = Query.parse(props.location.search);

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);

    const { password, cpassword } = data;

    if (password !== cpassword) {
      alert("Passwords don't match");

      setLoading(false);
      return;
    }

    const reset = await async_func_data(
      "/api/user/resetPassword",
      {
        new_password: password,
        email,
        type: "student",
      },
      "post",
      false
    );

    if (reset.data.error) {
      notification["error"]({
        message: "Password Reset",
        description: reset.data.message,
      });

      setLoading(false);
      return;
    }

    setLoading(false);

    notification["success"]({
      message: "Password Reset",
      description: "Password Reset Successful!",
    });

    setRedirect(true);
  };

  const handleFailure = () => {};

  if (redirect) return <Redirect to='/login' />;

  return (
    <div className={styles.root}>
      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleFailure}
        className={styles.form}
      >
        <Form.Item label='Email ID'>
          <Input disabled value={email} />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[{ required: true, message: "Password cannot be empty!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='cpassword'
          label='Confirm Password'
          rules={[
            { required: true, message: "Confirm Password cannot be empty!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
