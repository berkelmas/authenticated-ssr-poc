import React from "react";
import classes from "./RepliesList.module.scss";
import LoaderOverlay from "../../micro-components/LoaderOverlay/LoaderOverlay";
import SingleReplyItem from "./SingleReplyItem/SingleReplyItem";

const RepliesList = ({ replies, loading, ...props }) => {
  return (
    <div className="row" style={{ position: "relative", minHeight: "100px" }}>
      {loading && <LoaderOverlay />}

      {replies.map((item) => (
        <div key={item._id} className="col-md-6 col-sm-12">
          <SingleReplyItem reply={item} />
        </div>
      ))}
    </div>
  );
};

export default RepliesList;
