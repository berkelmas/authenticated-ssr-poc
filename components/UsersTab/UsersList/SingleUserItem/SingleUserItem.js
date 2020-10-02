import React, { useEffect, useState } from "react";
import classes from "./SingleUserItem.module.scss";
import { Card, Tooltip, Modal } from "antd";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";
import EditUserModal from "../../EditUserModal/EditUserModal";
import DeleteUserModal from "../../DeleteUserModal/DeleteUserModal";
import { useDispatch } from "react-redux";
import { reloadAllRestaurantsAction } from "../../../../store/actions/restaurant-actions";
import { reloadAllUsersAction } from "../../../../store/actions/user-crud-actions";
import { reloadAllReplyAction } from "../../../../store/actions/reply-actions";
import { reloadAllReviewsAction } from "../../../../store/actions/review-actions";

const SingleUserItem = ({ user, ...props }) => {
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const reloadAllData = () => {
    dispatch(reloadAllRestaurantsAction());
    dispatch(reloadAllUsersAction());
    dispatch(reloadAllReplyAction());
    dispatch(reloadAllReviewsAction());
  };

  return (
    <Card
      className="mt-4 shadow-sm w-100"
      bodyStyle={{ padding: 0, position: "relative", width: "100%" }}
    >
      <div className="d-flex w-100">
        <div
          className="p-2 w-100"
          style={{ height: "150px", overflow: "scroll" }}
        >
          <h5 className={`${classes.HeaderTypo}`}>
            {user.username} <span>({user.role})</span>
          </h5>
          {user.restaurants.length ? (
            <p className="m-0">Restaurants: </p>
          ) : null}
          <div className="w-100">
            {user.restaurants.map((item) => (
              <p style={{ color: "#767676" }} className="m-0" key={item._id}>
                - {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Tooltip placement="topLeft" title={"Delete User"}>
        <span
          onClick={() => setDeleteModalOpen(true)}
          className="shadow-sm"
          style={{
            display: "flex",
            cursor: "pointer",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: -20,
            right: 60,
            backgroundColor: "white",
            height: "40px",
            width: "40px",
            borderRadius: "25px",
          }}
        >
          <DeleteOutlined style={{ color: "#767676", fontSize: 20 }} />
        </span>
      </Tooltip>

      <Tooltip placement="topLeft" title={"Edit User"}>
        <span
          onClick={() => setEditModalOpen(true)}
          className="shadow-sm"
          style={{
            cursor: "pointer",
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: -20,
            right: 10,
            backgroundColor: "#ff585d",
            height: "40px",
            width: "40px",
            borderRadius: "25px",
          }}
        >
          <EditOutlined style={{ color: "white", fontSize: 18 }} />
        </span>
      </Tooltip>

      {/* EDIT MODAL */}
      <Modal
        destroyOnClose={true}
        onOk={() => setEditModalOpen(false)}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
        title="Edit User"
        visible={editModalOpen}
      >
        <EditUserModal
          user={user}
          closeModal={() => setEditModalOpen(false)}
          reloadData={reloadAllData}
        />
      </Modal>
      {/* DELETE MODAL */}
      <Modal
        destroyOnClose={true}
        onOk={() => setDeleteModalOpen(false)}
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
        title="Delete User"
        visible={deleteModalOpen}
      >
        <DeleteUserModal
          reloadData={reloadAllData}
          user={user}
          closeModal={() => setDeleteModalOpen(false)}
        />
      </Modal>
    </Card>
  );
};

export default SingleUserItem;
