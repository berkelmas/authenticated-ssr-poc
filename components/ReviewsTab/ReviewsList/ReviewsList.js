import React from "react";
import classes from "./ReviewsList.module.scss";
import SingleReviewItem from "./SingleReviewItem/SingleReviewItem";
import LoaderOverlay from "../../micro-components/LoaderOverlay/LoaderOverlay";

const ReviewsList = ({ reviews, loading, openReplyModal, ...props }) => {
  return (
    <div className="row" style={{ position: "relative", minHeight: "100px" }}>
      {loading && <LoaderOverlay />}

      {reviews.map((item) => (
        <div key={item._id} className="col-md-6 col-sm-12">
          <SingleReviewItem
            openReplyModal={(review) => openReplyModal(review)}
            review={item}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
