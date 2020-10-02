import React, { useRef, useEffect } from "react";
import classes from "./EditRestaurantModal.module.scss";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Form, Button, Input, message } from "antd";
import MinusOutlined from "@ant-design/icons/MinusOutlined";
import { updateRestaurantService } from "../../../services/restaurant-service";
import { convertBase64 } from "../../../utility/general/convert-base64";
import { editRestaurantValidationSchema } from "./editRestaurantValidationSchema";
import { reloadAllRestaurantsAction } from "../../../store/actions/restaurant-actions";
import { reloadAllReplyAction } from "../../../store/actions/reply-actions";
import { reloadAllReviewsAction } from "../../../store/actions/review-actions";
import { reloadAllUsersAction } from "../../../store/actions/user-crud-actions";

const EditRestaurantModal = ({ closeModal, restaurant }) => {
  const dispatch = useDispatch();
  const imageInputRef = useRef();

  const formik = useFormik({
    initialValues: {
      restaurantImage: null,
      restaurantName: restaurant.name,
      restaurantDescription: restaurant.description,
    },
    validationSchema: editRestaurantValidationSchema,
    onSubmit: (
      { restaurantImage, restaurantName, restaurantDescription },
      actions
    ) => {
      updateRestaurantService(
        restaurant._id,
        restaurantName,
        restaurantDescription,
        restaurantImage
      )
        .then(({ data: result }) => {
          const { data } = result;
          closeModal();
          message.success("Updating restaurant is successfull!");
          reloadAllData();
        })
        .catch((e) => {
          if (e.response) {
            message.error(e.response.data);
          }
        })
        .finally((_) => actions.setSubmitting(false));
    },
  });

  const reloadAllData = () => {
    dispatch(reloadAllRestaurantsAction());
    dispatch(reloadAllUsersAction());
    dispatch(reloadAllReplyAction());
    dispatch(reloadAllReviewsAction());
  };

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
    <div>
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

            {formik.values.restaurantImage ? (
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
            ) : (
              <div>
                <img
                  alt=""
                  src={restaurant.image}
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
            onClick={() => closeModal()}
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
    </div>
  );
};

export default EditRestaurantModal;
