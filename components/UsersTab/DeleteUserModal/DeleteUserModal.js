import React, { useState } from "react";
import classes from "./DeleteUserModal.module.scss";
import { Button, message } from "antd";
import { deleteUserService } from "../../../services/user-service";

const DeleteUserModal = ({ closeModal, user, reloadData }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteUser = () => {
    setDeleteLoading(true);
    deleteUserService(user._id)
      .then((res) => {
        message.success("Deleting user is successfull!");
        closeModal();
        reloadData();
      })
      .catch((e) => message.error(e))
      .finally((_) => setDeleteLoading(false));
  };

  return (
    <div>
      <p>Are you sure that you want to delete this user?</p>
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
          onClick={handleDeleteUser}
          loading={deleteLoading}
          type="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteUserModal;
