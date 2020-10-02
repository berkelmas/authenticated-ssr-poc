import React, { useEffect } from "react";
import classes from "./EditUserModal.module.scss";
import { useFormik } from "formik";
import { Form, Input, Button, message } from "antd";
import { editUserValidationSchema } from "./editUserValidationSchema";
import { editUserService } from "../../../services/user-service";

const EditUserModal = ({ user, closeModal, reloadData }) => {
  const formik = useFormik({
    initialValues: {
      username: user.username,
    },
    validationSchema: editUserValidationSchema,
    onSubmit: ({ username }, action) => {
      editUserService(user._id, username)
        .then(({ data: result }) => {
          const { data } = result;
          closeModal();
          reloadData();
          message.success(result.message);
        })
        .catch((e) => message.error(e.response && e.response.data))
        .finally((_) => action.setSubmitting(false));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Form.Item
          hasFeedback
          validateStatus={
            formik.errors.username && formik.touched.username
              ? "error"
              : formik.touched.username && "success"
          }
        >
          <Input
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="username"
            name="username"
          />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => closeModal()}
            htmlType="button"
            type="dashed"
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            disabled={!formik.isValid}
            loading={formik.isSubmitting}
            type="primary"
          >
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
