// role can be ['regular', 'owner', 'admin']
import React from "react";
import classes from "../../components/RestaurantsTab/RestaurantsTab.module.scss";
import { Select, Button } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";

export const restaurantsHeaderRenderer = (
  role,
  onAddButtonClicked,
  onFilterChange
) => {
  switch (role) {
    case "regular":
      return {
        header: (
          <h3 className={classes.RestaurantsHeader}>
            Restaurants to <span>Explore</span>
          </h3>
        ),
        description: (
          <p className={classes.RestaurantsDescription}>
            Here you can find out new restaurants to explore and rate them if
            you experienced.
          </p>
        ),
        rightPart: (
          <div className="d-flex align-items-center">
            <Select
              onChange={(val) => onFilterChange(val)}
              placeholder="Rating"
              className="mr-2"
              style={{ minWidth: "100px" }}
            >
              <Select.Option value={null}>All</Select.Option>
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </div>
        ),
      };
    case "owner":
      return {
        header: (
          <h3 className={classes.RestaurantsHeader}>
            My <span>Restaurants</span>
          </h3>
        ),
        description: (
          <p className={classes.RestaurantsDescription}>
            Here you can view your restaurants.
          </p>
        ),
        rightPart: (
          <div className="d-flex align-items-center">
            <Select
              onChange={(val) => onFilterChange(val)}
              placeholder="Rating"
              className="mr-2"
              style={{ minWidth: "100px" }}
            >
              <Select.Option value={null}>All</Select.Option>
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
            <Button
              onClick={onAddButtonClicked}
              shape="circle"
              size={"large"}
              icon={
                <div className="d-flex justify-content-center align-items-center">
                  <PlusOutlined />
                </div>
              }
            ></Button>
          </div>
        ),
      };
    case "admin":
      return {
        header: (
          <h3 className={classes.RestaurantsHeader}>
            All <span>Restaurants</span>
          </h3>
        ),
        description: (
          <p className={classes.RestaurantsDescription}>
            Here you can view/delete/update all restaurants as an admin.
          </p>
        ),
        rightPart: (
          <div className="d-flex align-items-center">
            <Select
              onChange={(val) => onFilterChange(val)}
              placeholder="Rating"
              className="mr-2"
              style={{ minWidth: "100px" }}
            >
              <Select.Option value={null}>All</Select.Option>
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </div>
        ),
      };
    default:
      break;
  }
};
