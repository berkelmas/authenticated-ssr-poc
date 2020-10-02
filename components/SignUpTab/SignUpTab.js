import React from "react";
import { useFormik } from "formik";
import { signUpValidationSchema } from "./signUpValidationSchema";
import classes from "./SignUpTab.module.scss";
import { Input, Button, Form, Select, message } from "antd";
import LoginOutlined from "@ant-design/icons/LoginOutlined";
// import {
//   startRegisterAction,
//   successRegisterAction,
//   failedRegisterAction,
// } from "../../store/actions/user-actions";
// import { useDispatch, useSelector } from "react-redux";
// import { push } from "connected-react-router";
// import { signUpService } from "../../services/authentication-service";

const { Option } = Select;

const SignUpTab = () => {
  // const dispatch = useDispatch();
  // const registerLoading = useSelector(
  //   (state) => state.UserReducer.registerLoading
  // );
  const formik = useFormik({
    initialValues: {
      username: null,
      password: null,
      confirmPassword: null,
      role: null,
    },
    validationSchema: signUpValidationSchema,
    onSubmit: ({ username, password, role }) => {
      // dispatch(startRegisterAction());
      // signUpService(username, password, role)
      //   .then(({ data: result }) => {
      //     const { data } = result;
      //     localStorage.setItem(
      //       "user",
      //       JSON.stringify({
      //         username: data.username,
      //         role: data.role,
      //         accessToken: data.token,
      //       })
      //     );
      //     dispatch(
      //       successRegisterAction({
      //         username: data.username,
      //         role: data.role,
      //         accessToken: data.token,
      //       })
      //     );
      //     message.success("Registering is successfull!");
      //     dispatch(push("/main"));
      //   })
      //   .catch((e) => {
      //     dispatch(failedRegisterAction());
      //     if (e.response) {
      //       message.error(e.response.data);
      //     }
      //   });
    },
  });

  return (
    <div className="p-3">
      <form onSubmit={formik.handleSubmit}>
        <h4 className={classes.AuthHeader}>Sign Up</h4>
        <p className={classes.AuthDescription}>
          Here you can create new account to get involved in the taste
          project...
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
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? "error"
              : formik.touched.confirmPassword && "success"
          }
        >
          <Input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Password Confirm"
          />
        </Form.Item>

        <div className="d-flex justify-content-end mt-3">
          <Form.Item
            className="mr-3"
            hasFeedback
            validateStatus={
              formik.errors.role && formik.touched.role
                ? "error"
                : formik.touched.role && "success"
            }
          >
            <Select
              name="role"
              value={formik.values.role}
              placeholder="Select Role"
              style={{ width: 120 }}
              onChange={(val) => formik.setFieldValue("role", val)}
              onBlur={formik.handleBlur}
            >
              <Option value="admin">Admin</Option>
              <Option value="owner">Owner</Option>
              <Option value="regular">Regular</Option>
            </Select>
          </Form.Item>
          <Button
            disabled={!formik.dirty || (formik.dirty && !formik.isValid)}
            loading={false}
            htmlType="submit"
            type="primary"
            icon={<LoginOutlined />}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpTab;
