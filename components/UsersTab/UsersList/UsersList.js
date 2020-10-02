import React from "react";
import classes from "./UsersList.module.scss";
import LoaderOverlay from "../../micro-components/LoaderOverlay/LoaderOverlay";
import SingleUserItem from "./SingleUserItem/SingleUserItem";

const UsersList = ({ users, loading }) => {
  return (
    <div className="row" style={{ position: "relative" }}>
      {loading && <LoaderOverlay />}

      {users.map((item) => (
        <div key={item._id} className="col-md-6 col-sm-12">
          <SingleUserItem user={item} />
        </div>
      ))}
    </div>
  );
};

export default UsersList;
