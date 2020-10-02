import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { message, Button } from "antd";
import classes from "./DeleteRepliesModal.module.scss";
import { deleteReplyService } from "../../../services/reply-service";
import { reloadAllRestaurantsAction } from "../../../store/actions/restaurant-actions";
import { reloadAllUsersAction } from "../../../store/actions/user-crud-actions";
import { reloadAllReplyAction } from "../../../store/actions/reply-actions";
import { reloadAllReviewsAction } from "../../../store/actions/review-actions";

const DeleteRepliesModal = ({ closeModal, review }) => {
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteReply = () => {
    setDeleteLoading(true);
    deleteReplyService(review._id)
      .then((res) => {
        message.success("Deleting reply is successfull!");
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
      <p>Are you sure that you want to delete this reply?</p>
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
          onClick={handleDeleteReply}
          loading={deleteLoading}
          type="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteRepliesModal;
