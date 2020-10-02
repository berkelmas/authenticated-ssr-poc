import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./RepliesTab.module.scss";
import { Pagination } from "antd";
import { replyHeaderRenderer } from "../../utility/header-renderers";
import { startGettingReplyAction } from "../../store/actions/reply-actions";
import RepliesList from "./RepliesList/RepliesList";

const PAGE_SIZE = 4;

const RepliesTab = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.UserReducer.role);
  const loadingReplies = useSelector(
    (state) => state.ReplyReducer.loadingReplies
  );
  const replies = useSelector((state) => state.ReplyReducer.replies);
  const [paginatedReplies, setPaginatedReplies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   loadData();
  // }, []);

  const loadData = () => {
    dispatch(startGettingReplyAction());
  };

  useEffect(() => {
    setPaginatedReplies(
      replies.slice(
        currentPage * PAGE_SIZE - PAGE_SIZE,
        currentPage * PAGE_SIZE
      )
    );
  }, [replies]);

  useEffect(() => {
    setPaginatedReplies(
      replies.slice(
        currentPage * PAGE_SIZE - PAGE_SIZE,
        currentPage * PAGE_SIZE
      )
    );
  }, [currentPage]);

  return (
    <div className="p-3">
      {replyHeaderRenderer(userRole).header}
      {replyHeaderRenderer(userRole).description}
      <RepliesList replies={paginatedReplies} loading={loadingReplies} />
      <div className="d-flex justify-content-end mt-5">
        <Pagination
          current={currentPage}
          total={replies.length}
          pageSize={4}
          onChange={(page, pageSize) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default RepliesTab;
