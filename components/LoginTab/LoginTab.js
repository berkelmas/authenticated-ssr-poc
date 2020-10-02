import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { loginValidationSchema } from "./loginValidationSchema";
import classes from "./LoginTab.module.scss";
import { Input, Button, Form, message } from "antd";
import LoginOutlined from "@ant-design/icons/LoginOutlined";
import {
  failedLoginAction,
  startLoginAction,
  successLoginAction,
} from "../../store/actions/user-actions";
import { loginService } from "../../services/authentication-service";
import { useRouter } from "next/router";

const LoginTab = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginLoading = useSelector((state) => state.UserReducer.loginLoading);
  const formik = useFormik({
    initialValues: {
      username: null,
      password: null,
    },
    validationSchema: loginValidationSchema,
    onSubmit: ({ username, password }) => {
      dispatch(startLoginAction());
      loginService(username, password)
        .then(({ data: result }) => {
          const { data } = result;
          document.cookie = `accessToken=${data.token};`;
          document.cookie = `username=${data.username}`;
          document.cookie = `role=${data.role}`;
          dispatch(
            successLoginAction({
              username: data.username,
              role: data.role,
              accessToken: data.token,
            })
          );
          router.push("/main");
          message.success(result.message);
          // dispatch(push("/main"));
        })
        .catch((e) => {
          dispatch(failedLoginAction());
          if (e.response) {
            message.error(e.response.data);
          }
        });
    },
  });

  return (
    <div className="p-3">
      <form onSubmit={formik.handleSubmit}>
        <h4 className={classes.AuthHeader}>Sign In</h4>
        <p className={classes.AuthDescription}>
          Here you can sign in to get a taste…
        </p>
        <Form.Item
          hasFeedback
          validateStatus={
            formik.errors.username && formik.touched.username
              ? "error"
              : formik.touched.username && "success"
          }
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            onBlur={formik.handleBlur}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={
            formik.errors.password && formik.touched.password
              ? "error"
              : formik.touched.password && "success"
          }
        >
          <Input
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            onBlur={formik.handleBlur}
            placeholder="Password"
          />
        </Form.Item>

        <div className="d-flex justify-content-end mt-3">
          <Button
            loading={loginLoading}
            disabled={!formik.dirty || (formik.dirty && !formik.isValid)}
            htmlType="submit"
            type="primary"
            icon={<LoginOutlined />}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginTab;
