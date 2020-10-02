import React, { useState } from "react";
import classes from "./RatingStarsForm.module.scss";
import StarOutlined from "@ant-design/icons/StarOutlined";
import StarFilled from "@ant-design/icons/StarFilled";

const RatingStarsForm = ({ currentRating, setCurrentRating }) => {
  // const [currentRating, setCurrentRating] = useState(0);

  return (
    <div className="d-flex mb-3">
      {Array(5)
        .fill()
        .map((_, index) =>
          index + 1 > currentRating ? (
            <StarOutlined
              key={index}
              style={{ color: "#FAEE1C", fontSize: "24px" }}
              onClick={() => setCurrentRating(index + 1)}
            />
          ) : (
            <StarFilled
              key={index}
              style={{ color: "#FAEE1C", fontSize: "24px" }}
              onClick={() => setCurrentRating(index + 1)}
            />
          )
        )}
    </div>
  );
};

export default RatingStarsForm;
