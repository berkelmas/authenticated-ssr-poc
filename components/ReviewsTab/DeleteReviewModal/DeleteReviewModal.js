import React, { useState } from "react";
import classes from "./DeleteReviewModal.module.scss";
import { message, Button } from "antd";
import { deleteReviewService } from "../../../services/review-service";
import { useDispatch } from "react-redux";
import { reloadAllRestaurantsAction } from "../../../store/actions/restaurant-actions";
import { reloadAllUsersAction } from "../../../store/actions/user-crud-actions";
import { reloadAllReplyAction } from "../../../store/actions/reply-actions";
import { reloadAllReviewsAction } from "../../../store/actions/review-actions";

const DeleteReviewModal = ({ review, closeModal }) => {
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteReview = () => {
    setDeleteLoading(true);
    deleteReviewService(review._id)
      .then((res) => {
        message.success("Deleting review is successfull!");
        closeModal();
        reloadAllData();
      })
      .catch((e) => message.error(e.message))
      .finally((_) => setDeleteLoading(false));
  };

  const reloadAllData = () => {
    dispatch(reloadAllRestaurantsAction());
    dispatch(reloadAllUsersAction());
    dispatch(reloadAllReplyAction());
    dispatch(reloadAllReviewsAction());
  };

  return (
    <div>
      <p>Are you sure that you want to delete this review?</p>
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
          onClick={handleDeleteReview}
          loading={deleteLoading}
          type="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
