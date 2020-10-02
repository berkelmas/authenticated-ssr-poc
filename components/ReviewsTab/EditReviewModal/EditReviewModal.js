import React from "react";
import classes from "./EditReviewModal.module.scss";
import { Form, Input, Button, message } from "antd";
import RatingStarsForm from "../../micro-components/RatingStarsForm/RatingStarsForm";
import { useFormik } from "formik";
import { editReviewValidationSchema } from "./editReviewValidationSchema";
import { editReviewService } from "../../../services/review-service";
import { useDispatch } from "react-redux";
import { reloadAllRestaurantsAction } from "../../../store/actions/restaurant-actions";
import { reloadAllUsersAction } from "../../../store/actions/user-crud-actions";
import { reloadAllReplyAction } from "../../../store/actions/reply-actions";
import { reloadAllReviewsAction } from "../../../store/actions/review-actions";

const EditReviewModal = ({ review, closeModal }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      rating: review.rating,
      description: review.comment,
    },
    validationSchema: editReviewValidationSchema,
    onSubmit: ({ rating, description }, actions) => {
      editReviewService(review._id, { ...review, comment: description, rating })
        .then(({ data }) => {
          const { message: resultMessage } = data;
          message.success(resultMessage);
          closeModal();
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

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <RatingStarsForm
          currentRating={formik.values.rating}
          setCurrentRating={(val) => formik.setFieldValue("rating", val)}
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
            value={formik.values.description}
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
            disabled={!formik.isValid}
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

export default EditReviewModal;
