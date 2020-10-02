import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Pagination } from "antd";
import classes from "./RestaurantsTab.module.scss";
import { restaurantsHeaderRenderer } from "../../utility/header-renderers";
import AddNewRestaurantModal from "./AddNewRestaurantModal/AddNewRestaurantModal";
import DeleteRestaurantModal from "./DeleteRestaurantModal/DeleteRestaurantModal";
import EditRestaurantModal from "./EditRestaurantModal/EditRestaurantModal";
import RestaurantsList from "./RestaurantsList/RestaurantsList";
import { getRestaurantsHttpFactory } from "../../utility/http-service-factory/get-restaurants-http-factory";
import ReviewRestaurantModal from "./ReviewRestaurantModal/ReviewRestaurantModal";
import { changeFilteringOrPaginationAction } from "../../store/actions/restaurant-actions";

const PAGE_SIZE = 4;

const RestaurantsTab = () => {
  const userRole = useSelector((state) => state.UserReducer.role);
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state) => state.RestaurantReducer.restaurants
  );
  const currentPage = useSelector(
    (state) => state.RestaurantReducer.currentPage
  );
  const rating = useSelector((state) => state.RestaurantReducer.rating);
  const totalCount = useSelector((state) => state.RestaurantReducer.totalCount);
  const loadingRestaurants = useSelector(
    (state) => state.RestaurantReducer.loadingRestaurants
  );
  const [addModalVisible, setAddModalVisible] = useState(false);
  // REVIEW
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [selectedRestaurantReview, setSelectedRestaurantReview] = useState(
    null
  );

  // useEffect(() => {
  //   loadData(currentPage, rating);
  // }, []);

  const loadData = (currentPage, rating) => {
    dispatch(
      changeFilteringOrPaginationAction(
        currentPage,
        PAGE_SIZE,
        rating,
        userRole
      )
    );
  };

  const handleAddButtonClick = () => {
    setAddModalVisible(true);
  };
  const handleFilterChange = (val) => {
    dispatch(changeFilteringOrPaginationAction(1, PAGE_SIZE, val, userRole));
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {restaurantsHeaderRenderer(userRole).header}
          {restaurantsHeaderRenderer(userRole).description}
        </div>
        {
          restaurantsHeaderRenderer(
            userRole,
            handleAddButtonClick,
            handleFilterChange
          ).rightPart
        }
      </div>
      <RestaurantsList
        openReviewModal={(restaurant) => {
          setSelectedRestaurantReview(restaurant);
          setReviewModalVisible(true);
        }}
        loading={loadingRestaurants}
        userRole={userRole}
        restaurants={restaurants}
      />
      <div className="d-flex justify-content-end mt-5">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={4}
          onChange={(page, pageSize) => {
            dispatch(
              changeFilteringOrPaginationAction(
                page,
                PAGE_SIZE,
                rating,
                userRole
              )
            );
          }}
        />
      </div>
      <Modal
        title="Add New Restaurant"
        destroyOnClose={true}
        onOk={() => setAddModalVisible(false)}
        onCancel={() => setAddModalVisible(false)}
        visible={addModalVisible}
        footer={null}
      >
        <AddNewRestaurantModal
          visible={addModalVisible}
          closeModal={() => setAddModalVisible(false)}
          reloadRestaurants={() => loadData(currentPage, rating)}
        />
      </Modal>
      <Modal
        title="Review Restaurant"
        destroyOnClose={true}
        onOk={() => setReviewModalVisible(false)}
        onCancel={() => setReviewModalVisible(false)}
        visible={reviewModalVisible}
        footer={null}
      >
        <ReviewRestaurantModal
          restaurant={selectedRestaurantReview}
          closeModal={() => setReviewModalVisible(false)}
          reloadRestaurants={() => loadData(currentPage, rating)}
        />
      </Modal>
    </div>
  );
};

export default RestaurantsTab;
