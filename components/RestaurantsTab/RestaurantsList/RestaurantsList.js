import React from "react";
import SingleRestaurantItem from "./SingleRestaurantItem/SingleRestaurantItem";
import LoaderOverlay from "../../micro-components/LoaderOverlay/LoaderOverlay";

const RestaurantsList = ({ userRole, restaurants, loading, ...props }) => {
  return (
    <div className="row" style={{ position: "relative" }}>
      {loading && <LoaderOverlay />}

      {restaurants.map((item) => (
        <div key={item._id} className="col-md-6 col-sm-12">
          <SingleRestaurantItem
            openReviewModal={props.openReviewModal}
            restaurant={item}
          />
        </div>
      ))}
    </div>
  );
};

export default RestaurantsList;
