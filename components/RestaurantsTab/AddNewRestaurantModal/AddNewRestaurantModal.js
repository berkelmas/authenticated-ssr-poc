import React, { useRef } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import MinusOutlined from "@ant-design/icons/MinusOutlined";
import { useFormik } from "formik";
import { convertBase64 } from "../../../utility/general/convert-base64";
import classes from "./AddNewRestaurantModal.module.scss";
import { addRestaurantValidationSchema } from "./addRestaurantValidationSchema";
import { createRestaurantService } from "../../../services/restaurant-service";

const AddNewRestaurantModal = ({ visible, ...props }) => {
  const imageInputRef = useRef();

  const formik = useFormik({
    initialValues: {
      restaurantImage: null,
      restaurantName: null,
      restaurantDescription: null,
    },
    validationSchema: addRestaurantValidationSchema,
    onSubmit: (
      { restaurantImage, restaurantName, restaurantDescription },
      actions
    ) => {
      createRestaurantService(
        restaurantName,
        restaurantDescription,
        restaurantImage
      )
        .then(({ data: result }) => {
          const { data } = result;
          actions.setSubmitting(false);
          props.closeModal();
          message.success("Adding new restaurant is successfull!");
          props.reloadRestaurants();
        })
        .catch((e) => {
          actions.setSubmitting(false);
          if (e.response) {
            message.error(e.response.data);
          }
        });
    },
  });

  const handleFileUpload = async (e, form) => {
    e.persist();
    const { files } = e.target;
    if (files.length) {
      const base64Img = await convertBase64(files[0]);
      formik.setFieldValue("restaurantImage", base64Img);
      imageInputRef.current.value = null;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Item>
        <div className="d-flex justify-content-between align-items-center w-100">
          <input
            hidden
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileUpload}
            ref={imageInputRef}
          />
          <Button
            onClick={() =>
              imageInputRef.current && imageInputRef.current.click()
            }
            htmlType="button"
          >
            Upload Image
          </Button>

          {formik.values.restaurantImage && (
            <div style={{ position: "relative" }}>
              <div
                onClick={() => formik.setFieldValue("restaurantImage", null)}
                className={classes.deleteImageCover}
                style={{
                  boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MinusOutlined style={{ fontSize: "20px" }} />
              </div>
              <img
                alt=""
                src={formik.values.restaurantImage}
                style={{
                  width: "100px",
                  height: "50px",
                  objectFit: "cover",
                  boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
                }}
              />
            </div>
          )}
        </div>
      </Form.Item>
      <Form.Item
        hasFeedback
        validateStatus={
          formik.errors.restaurantName && formik.touched.restaurantName
            ? "error"
            : formik.touched.restaurantName && "success"
        }
      >
        <Input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.restaurantName}
          name="restaurantName"
          placeholder="Restaurant Name"
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        validateStatus={
          formik.errors.restaurantDescription &&
          formik.touched.restaurantDescription
            ? "error"
            : formik.touched.restaurantDescription && "success"
        }
      >
        <Input.TextArea
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.restaurantDescription}
          name="restaurantDescription"
          placeholder="Restaurant Description"
        />
      </Form.Item>

      <div className="d-flex justify-content-end">
        <Button
          onClick={() => props.closeModal()}
          htmlType="button"
          type="dashed"
          className="mr-2"
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          disabled={!formik.dirty || (formik.dirty && !formik.isValid)}
          loading={formik.isSubmitting}
          type="primary"
        >
          Add New
        </Button>
      </div>
    </form>
  );
};

export default AddNewRestaurantModal;
