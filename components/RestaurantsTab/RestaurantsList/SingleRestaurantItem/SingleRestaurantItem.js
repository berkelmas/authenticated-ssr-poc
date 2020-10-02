import React, { useState } from "react";
import classes from "./SingleRestaurantItem.module.scss";
import { Card, Tooltip, Button, Modal } from "antd";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import RollbackOutlined from "@ant-design/icons/RollbackOutlined";
import RatingStars from "../../../micro-components/RatingStars/RatingStars";
import { useSelector } from "react-redux";
import DeleteRestaurantModal from "../../DeleteRestaurantModal/DeleteRestaurantModal";
import EditRestaurantModal from "../../EditRestaurantModal/EditRestaurantModal";

const SingleRestaurantItem = ({ restaurant, ...props }) => {
  const userRole = useSelector((state) => state.UserReducer.role);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <a>
        <Card
          className={`mt-4 shadow-sm ${classes.RestaurantCard}`}
          bodyStyle={{ padding: 0, position: "relative" }}
        >
          <div className="d-flex">
            <img
              src={restaurant.image}
              alt=""
              style={{ height: "170px", width: "30%", objectFit: "cover" }}
            />
            <div
              className="p-2"
              style={{ overflow: "scroll", maxHeight: "170px" }}
            >
              <h5 className={`${classes.HeaderTypo}`} style={{}}>
                {restaurant.name}
              </h5>
              {restaurant.averageRating ? (
                <RatingStars starCount={restaurant.averageRating} />
              ) : (
                <p className="mb-0" style={{ color: "#767676" }}>
                  No ratings
                </p>
              )}

              <p style={{ color: "#767676" }}>{restaurant.description}</p>
            </div>
          </div>
          {userRole === "owner" && (
            <Tooltip placement="topLeft" title={"Pending Replies"}>
              <span
                className="shadow-sm"
                style={{
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
                <span style={{ color: "white", fontSize: "15px" }}>
                  {restaurant.pendingReplyCount}
                </span>
              </span>
            </Tooltip>
          )}
          {userRole === "admin" && (
            <Tooltip placement="topLeft" title={"Edit Restaurant"}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModalOpen(true);
                }}
                className="shadow-sm"
                style={{
                  pointerEvents: "all",
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
          )}

          {userRole === "admin" && (
            <Tooltip placement="topLeft" title={"Delete Restaurant"}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteModalOpen(true);
                }}
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
          )}

          {userRole === "regular" && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                props.openReviewModal(restaurant);
              }}
              type="secondary"
              htmlType="button"
              style={{
                display: "flex",
                cursor: "pointer",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                bottom: 20,
                right: 20,
              }}
            >
              <RollbackOutlined style={{ fontSize: 20 }} />
              Review
            </Button>
          )}
        </Card>
      </a>
      {/* EDIT MODAL */}
      <Modal
        destroyOnClose={true}
        onOk={() => setEditModalOpen(false)}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
        title="Edit Restaurant"
        visible={editModalOpen}
      >
        <EditRestaurantModal
          restaurant={restaurant}
          closeModal={() => setEditModalOpen(false)}
        />
      </Modal>
      {/* DELETE MODAL */}
      <Modal
        destroyOnClose={true}
        onOk={() => setDeleteModalOpen(false)}
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
        title="Delete Restaurant"
        visible={deleteModalOpen}
      >
        <DeleteRestaurantModal
          restaurant={restaurant}
          closeModal={() => setDeleteModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default SingleRestaurantItem;
