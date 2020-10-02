import React from "react";
import classes from "../../components/UsersTab/UsersTab.module.scss";

export const userHeaderRenderer = (role) => {
  switch (role) {
    case "regular":
      return { header: null, description: null };
    case "owner":
      return { header: null, description: null };
    case "admin":
      return {
        header: (
          <h3 className={classes.UsersHeader}>
            All <span>Users</span>
          </h3>
        ),
        description: (
          <p className={classes.UsersDescription}>
            Here you can view/delete/update all users as an admin.
          </p>
        ),
      };
    default:
      break;
  }
};
