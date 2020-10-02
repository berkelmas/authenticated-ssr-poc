import React, { useEffect, useState } from "react";
import classes from "./SingleReviewItem.module.scss";
import { Card, Button, Tooltip, Modal } from "antd";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import RollbackOutlined from "@ant-design/icons/RollbackOutlined";
import EditReviewModal from "../../EditReviewModal/EditReviewModal";
import DeleteReviewModal from "../../DeleteReviewModal/DeleteReviewModal";
import { useSelector } from "react-redux";
import RatingStars from "../../../micro-components/RatingStars/RatingStars";

const SingleReviewItem = ({ review, openReplyModal, ...props }) => {
  const userRole = useSelector((state) => state.UserReducer.role);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <Card
      className="mt-4 shadow-sm"
      bodyStyle={{ padding: 0, position: "relative" }}
    >
      <div className="d-flex">
        <img
          src={review.image}
          alt=""
          style={{ height: "170px", width: "30%", objectFit: "cover" }}
        />
        <div
          className="p-2 w-100"
          style={{ overflow: "scroll", maxHeight: "170px" }}
        >
          <h5 className={`mb-0 mt-3 ${classes.HeaderTypo}`} style={{}}>
            Review on <span>{review.restaurantName}</span>
          </h5>
          <p className={classes.CommentedByText}>
            Commented by{" "}
            <span style={{ color: "#ff585d" }}>{review.authorUsername}</span>
          </p>
          <RatingStars starCount={review.rating} />
          <p style={{ color: "#767676" }}>{review.comment}</p>
          <div style={{ height: 20 }}></div>
        </div>
        {userRole === "owner" && (
          <div style={{ position: "absolute", bottom: 20, right: 20 }}>
            <Button onClick={() => openReplyModal(review)}>
              <RollbackOutlined style={{ fontSize: 20 }} />
              Reply
            </Button>
          </div>
        )}

        {userRole === "admin" && (
          <Tooltip placement="topLeft" title={"Edit Review"}>
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
        )}

        {userRole === "admin" && (
          <Tooltip placement="topLeft" title={"Delete Review"}>
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
        )}
      </div>

      {/* EDIT MODAL */}
      <Modal
        destroyOnClose={true}
        onOk={() => setEditModalOpen(false)}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
        title="Edit Review"
        visible={editModalOpen}
      >
        <EditReviewModal
          review={review}
          closeModal={() => setEditModalOpen(false)}
        />
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        destroyOnClose={true}
        onOk={() => setDeleteModalOpen(false)}
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
        title="Delete Review"
        visible={deleteModalOpen}
      >
        <DeleteReviewModal
          review={review}
          closeModal={() => setDeleteModalOpen(false)}
        />
      </Modal>
    </Card>
  );
};

export default SingleReviewItem;
