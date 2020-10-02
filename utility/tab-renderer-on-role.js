// role can be ['regular', 'owner', 'admin']
import React from "react";
import { Tabs } from "antd";
import RestaurantsTab from "../components/RestaurantsTab/RestaurantsTab";
import ReviewsTab from "../components/ReviewsTab/ReviewsTab";
import RepliesTab from "../components/RepliesTab/RepliesTab";
import UsersTab from "../components/UsersTab/UsersTab";

const { TabPane } = Tabs;

export const tabRendererOnRole = (role) => {
  switch (role) {
    case "regular":
      return (
        <Tabs tabBarStyle={{ marginLeft: 15 }} defaultActiveKey="sign_in">
          <TabPane tab="Restaurants" key="restaurants">
            <RestaurantsTab />
          </TabPane>
        </Tabs>
      );
    case "owner":
      return (
        <Tabs tabBarStyle={{ marginLeft: 15 }} defaultActiveKey="sign_in">
          <TabPane tab="My Restaurants" key="my_restaurants">
            <RestaurantsTab />
          </TabPane>
          <TabPane tab="Pending Replies" key="pending_replies">
            <ReviewsTab />
          </TabPane>
        </Tabs>
      );
    case "admin":
      return (
        <Tabs tabBarStyle={{ marginLeft: 15 }} defaultActiveKey="sign_in">
          <TabPane
            forceRender={true}
            tab="All Restaurants"
            key="all_restaurants"
          >
            <RestaurantsTab />
          </TabPane>
          <TabPane tab="All Users" key="all_users">
            <UsersTab />
          </TabPane>
          <TabPane tab="All Reviews" key="all_reviews">
            <ReviewsTab />
          </TabPane>
          <TabPane tab="All Replies" key="all_replies">
            <RepliesTab />
          </TabPane>
        </Tabs>
      );
    default:
      break;
  }
};
