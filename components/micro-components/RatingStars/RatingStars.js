import React from "react";
import classes from "./RatingStars.module.scss";
import StarOutlined from "@ant-design/icons/StarOutlined";
import StarFilled from "@ant-design/icons/StarFilled";

const RatingStars = ({ starCount }) => {
  return (
    <div className="d-flex">
      {Array(starCount)
        .fill()
        .map((_, index) => (
          <StarFilled
            key={index}
            style={{ color: "#FAEE1C", fontSize: "18px" }}
          />
        ))}
      {Array(5 - starCount)
        .fill()
        .map((_, index) => (
          <StarOutlined
            key={index}
            style={{ color: "#FAEE1C", fontSize: "18px" }}
          />
        ))}
    </div>
  );
};

export default RatingStars;
