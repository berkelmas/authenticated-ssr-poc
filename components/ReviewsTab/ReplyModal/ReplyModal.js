import React, { useEffect } from "react";
import classes from "./ReplyModal.module.scss";
import { Button, Card, Form, Input, message } from "antd";
import { useFormik } from "formik";
import { replyReviewValidationSchema } from "./replyReviewValidationSchema";
import RatingStars from "../../micro-components/RatingStars/RatingStars";
import { addReplyService } from "../../../services/reply-service";
import { useDispatch } from "react-redux";
import { reloadAllRestaurantsAction } from "../../../store/actions/restaurant-actions";
import { reloadAllUsersAction } from "../../../store/actions/user-crud-actions";
import { reloadAllReplyAction } from "../../../store/actions/reply-actions";
import { reloadAllReviewsAction } from "../../../store/actions/review-actions";

const ReplyModal = ({ closeModal, reloadData, review }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      description: null,
    },
    validationSchema: replyReviewValidationSchema,
    onSubmit: ({ description }, actions) => {
      addReplyService(review._id, description)
        .then(({ data: result }) => {
          message.success(result.message);
          closeModal();
          // reloadData();
          loadAllData();
        })
        .catch((err) => {
          message.error(err.response && err.response.data);
        })
        .finally((_) => actions.setSubmitting(false));
    },
  });

  const loadAllData = () => {
    dispatch(reloadAllRestaurantsAction());
    dispatch(reloadAllUsersAction());
    dispatch(reloadAllReplyAction());
    dispatch(reloadAllReviewsAction());
  };

  return (
    <div>
      <Card className="mt-4">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <p className={classes.ByText}>
              By <span>{review.authorUsername}</span>
            </p>
            <RatingStars starCount={review.rating} />
          </div>
          <div className="col-md-9 col-sm-12">
            <p className={classes.ByText}>{review.comment}</p>
          </div>
        </div>
      </Card>
      <form onSubmit={formik.handleSubmit}>
        <Form.Item
          hasFeedback
          validateStatus={
            formik.errors.description && formik.touched.description
              ? "error"
              : formik.touched.description && "success"
          }
          className="mt-4"
        >
          <Input.TextArea
            placeholder="Enter your reply"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <div className="d-flex justify-content-end mt-4">
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

export default ReplyModal;
