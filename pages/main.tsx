import { Tabs } from "antd";
import cookie from "cookie";
import { wrapper } from "../store/configureStore";
import { SUCCESS_LOGIN } from "../store/types/user-types";
import { useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { tabRendererOnRole } from "../utility/tab-renderer-on-role";
import { successGettingRestaurantsAction } from "../store/actions/restaurant-actions";
import { getRestaurantsHttpFactory } from "../utility/http-service-factory/get-restaurants-http-factory";

const { TabPane } = Tabs;

const MainPage = () => {
  const userRole = useSelector((state) => state.UserReducer.role);

  return <div>{tabRendererOnRole(userRole)}</div>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // GO BACK TO AUTHENTICATION PAGE IF NOT AUTHENTICATED.
    if (!context.req?.headers?.cookie) {
      context.res.setHeader("location", "/");
      context.res.statusCode = 302;
      context.res.end();
      return;
    }
    const { accessToken, username, role } = cookie.parse(
      context.req?.headers?.cookie
    );
    if (!accessToken) {
      context.res.setHeader("location", "/");
      context.res.statusCode = 302;
      context.res.end();
      return;
    }
    context.store.dispatch({
      type: SUCCESS_LOGIN,
      payload: { username, accessToken, role },
    });
    const {
      data: {
        data: { items, totalCount },
      },
    } = await getRestaurantsHttpFactory(
      role,
      context.store.getState().RestaurantReducer.currentPage,
      4,
      context.store.getState().RestaurantReducer.rating,
      accessToken
    );

    context.store.dispatch(successGettingRestaurantsAction(items, totalCount));

    return {
      props: {}, // will be passed to the page component as props
    };
  }
);

export default MainPage;
