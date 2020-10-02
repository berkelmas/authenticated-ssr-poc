import React from "react";
import classes from "../../components/RepliesTab/RepliesTab.module.scss";

export const replyHeaderRenderer = (role) => {
  switch (role) {
    case "regular":
      return {
        header: null,
        description: null,
      };
    case "owner":
      return {
        header: null,
        description: null,
      };
    case "admin":
      return {
        header: (
          <h3 className={classes.RepliesHeader}>
            All <span>Replies</span>
          </h3>
        ),
        description: (
          <p className={classes.RepliesDescription}>
            Here you can view/delete/update all replies as an admin.
          </p>
        ),
      };
    default:
      break;
  }
};
