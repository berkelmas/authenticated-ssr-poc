import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Tooltip, Modal } from "antd";
import classes from "./SingleReplyItem.module.scss";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import RatingStars from "../../../micro-components/RatingStars/RatingStars";
import EditRepliesModal from "../../EditRepliesModal/EditRepliesModal";
import DeleteRepliesModal from "../../DeleteRepliesModal/DeleteRepliesModal";

const SingleReplyItem = ({ reply, ...props }) => {
  const userRole = useSelector((state) => state.UserReducer.role);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <Card
      className="mt-4 shadow-sm"
      bodyStyle={{ padding: 0, paddingBottom: 10, position: "relative" }}
    >
      <div className="d-flex">
        <div
          className="p-2 w-100"
          style={{ overflow: "scroll", maxHeight: "300px" }}
        >
          <h6 className={`mb-0 ${classes.HeaderTypo}`}>
            {reply.restaurantOwnerUsername} <span>(Owner)</span>
          </h6>
          <p style={{ color: "#767676" }}>{reply.reply}</p>
          <p>Replied On:</p>
          <Card style={{ marginBottom: 10 }}>
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <p className={classes.ReviewerText}>
                  By <span>{reply.reviewAuthorUsername}</span>
                </p>
                <RatingStars starCount={reply.rating} />
              </div>
              <div className="col-md-9 col-sm-12">
                <p style={{ color: "#767676" }}>{reply.comment}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {userRole === "admin" && (
        <Tooltip placement="topLeft" title={"Edit Reply"}>
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
        <Tooltip placement="topLeft" title={"Delete Reply"}>
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
      {/* EDIT MODAL */}
      <Modal
        destroyOnClose={true}
        onOk={() => setEditModalOpen(false)}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
        title="Edit Reply"
        visible={editModalOpen}
      >
        <EditRepliesModal
          review={reply}
          closeModal={() => setEditModalOpen(false)}
        />
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        destroyOnClose={true}
        onOk={() => setDeleteModalOpen(false)}
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
        title="Delete Reply"
        visible={deleteModalOpen}
      >
        <DeleteRepliesModal
          review={reply}
          closeModal={() => setDeleteModalOpen(false)}
        />
      </Modal>
    </Card>
  );
};

export default SingleReplyItem;
