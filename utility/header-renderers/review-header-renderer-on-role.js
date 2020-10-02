import React from "react";
import classes from "../../components/ReviewsTab/ReviewsTab.module.scss";

export const reviewHeaderRenderer = (role) => {
  switch (role) {
    case "regular":
      return {
        header: null,
        description: null,
      };
    case "owner":
      return {
        header: (
          <h3 className={classes.ReviewsHeader}>
            Pending <span>Replies</span>
          </h3>
        ),
        description: (
          <p className={classes.ReviewsDescription}>
            Here you can reply reviews that has been made on your restaurants.
          </p>
        ),
      };
    case "admin":
      return {
        header: (
          <h3 className={classes.ReviewsHeader}>
            All <span>Reviews</span>
          </h3>
        ),
        description: (
          <p className={classes.ReviewsDescription}>
            Here you can view/delete/update all reviews as an admin.
          </p>
        ),
      };
    default:
      break;
  }
};
