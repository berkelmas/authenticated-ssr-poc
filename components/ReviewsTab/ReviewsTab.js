import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reviewHeaderRenderer } from "../../utility/header-renderers";
import { Pagination, Modal } from "antd";
import ReviewsList from "./ReviewsList/ReviewsList";
import ReplyModal from "./ReplyModal/ReplyModal";
import { startGettingReviewsAction } from "../../store/actions/review-actions";

const PAGE_SIZE = 4;

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.UserReducer.role);
  const loadingReviews = useSelector(
    (state) => state.ReviewReducer.loadingReviews
  );
  const reviews = useSelector((state) => state.ReviewReducer.reviews);
  const [paginatedReviews, setPaginatedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // REPLY MODAL
  const [replyModalState, setReplyModalState] = useState(false);
  const [selectedReviewToReply, setSelectedReviewToReply] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(startGettingReviewsAction(userRole));
  };

  useEffect(() => {
    setPaginatedReviews(
      reviews.slice(currentPage * PAGE_SIZE - PAGE_SIZE, PAGE_SIZE)
    );
  }, [reviews]);

  useEffect(() => {
    setPaginatedReviews(
      reviews.slice(
        currentPage * PAGE_SIZE - PAGE_SIZE,
        currentPage * PAGE_SIZE
      )
    );
  }, [currentPage]);

  const openReplyModal = (reviewId) => {
    setReplyModalState(true);
    setSelectedReviewToReply(reviewId);
  };

  const closeReplyModal = () => {
    setReplyModalState(false);
    setSelectedReviewToReply(null);
  };

  return (
    <>
      <div className="p-3">
        {reviewHeaderRenderer(userRole).header}
        {reviewHeaderRenderer(userRole).description}
        <ReviewsList
          openReplyModal={openReplyModal}
          reviews={paginatedReviews}
          loading={loadingReviews}
        />
        <div className="d-flex justify-content-end mt-5">
          <Pagination
            current={currentPage}
            total={reviews.length}
            pageSize={4}
            onChange={(page, pageSize) => setCurrentPage(page)}
          />
        </div>
      </div>
      <Modal
        title="Reply To Review"
        visible={replyModalState}
        destroyOnClose={true}
        onCancel={closeReplyModal}
        footer={null}
        width="50%"
      >
        <ReplyModal
          reloadData={loadData}
          closeModal={closeReplyModal}
          review={selectedReviewToReply}
        />
      </Modal>
    </>
  );
};

export default ReviewsTab;
