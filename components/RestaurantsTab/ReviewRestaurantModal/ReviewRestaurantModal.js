import React, { useState } from "react";
import classes from "./ReviewRestaurantModal.module.scss";
import { Input, Form, Button, message } from "antd";
import RatingStarsForm from "../../micro-components/RatingStarsForm/RatingStarsForm";
import { useFormik } from "formik";
import { reviewRestaurantValidationSchema } from "./reviewRestaurantValidationSchema";
import { reviewOnRestaurantService } from "../../../services/restaurant-service";

const ReviewRestaurantModal = ({
  restaurant,
  closeModal,
  reloadRestaurants,
  ...props
}) => {
  // const [currentRating, setCurrentRating] = useState(1);
  const formik = useFormik({
    initialValues: {
      currentRating: 1,
      description: null,
    },
    validationSchema: reviewRestaurantValidationSchema,
    onSubmit: ({ currentRating, description }, actions) => {
      reviewOnRestaurantService(restaurant._id, currentRating, description)
        .then(({ data }) => {
          const { message: resultMessage } = data;
          message.success(resultMessage);
          closeModal();
          reloadRestaurants();
        })
        .catch((e) => {
          if (e.response) {
            message.error(e.response.data);
          }
        })
        .finally((_) => actions.setSubmitting(false));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <RatingStarsForm
          currentRating={formik.values.currentRating}
          setCurrentRating={(val) => formik.setFieldValue("currentRating", val)}
        />
        <Form.Item
          hasFeedback
          validateStatus={
            formik.errors.description && formik.touched.description
              ? "error"
              : formik.touched.description && "success"
          }
        >
          <Input.TextArea
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="description"
            placeholder="Review Description"
          ></Input.TextArea>
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
            Add Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewRestaurantModal;
