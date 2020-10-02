import React, { useState } from "react";
import { Button, message } from "antd";
import classes from "./DeleteRestaurantModal.module.scss";
import { reloadAllRestaurantsAction } from "../../../store/actions/restaurant-actions";
import { reloadAllUsersAction } from "../../../store/actions/user-crud-actions";
import { reloadAllReplyAction } from "../../../store/actions/reply-actions";
import { reloadAllReviewsAction } from "../../../store/actions/review-actions";
import { useDispatch } from "react-redux";
import { deleteRestaurantService } from "../../../services/restaurant-service";

const DeleteRestaurantModal = ({ closeModal, restaurant }) => {
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteRestaurant = () => {
    setDeleteLoading(true);
    deleteRestaurantService(restaurant._id)
      .then(({ data }) => {
        message.success(data.message);
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
      <p>Are you sure that you want to delete this restaurant?</p>
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
          onClick={handleDeleteRestaurant}
          loading={deleteLoading}
          type="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteRestaurantModal;
