import Head from "next/head";
import classes from "../styles/Auth.module.css";
import cookie from "cookie";
import { Card, Tabs } from "antd";
import LoginTab from "../components/LoginTab/LoginTab";
import SignUpTab from "../components/SignUpTab/SignUpTab";
import BackImg from "../public/assets/images/auth-page-background.jpg";
import { GetServerSideProps } from "next";
import { wrapper } from "../store/configureStore";
import { SUCCESS_LOGIN } from "../store/types/user-types";

const { TabPane } = Tabs;

const Home: React.FC<{}> = () => {
  return (
    <div>
      <Head>
        <title>Authentication Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={classes.AuthContainer}
        style={{ backgroundImage: `url(${BackImg})` }}
      >
        <div className="row m-0 w-100">
          <div className="col-md-6 col-sm-10 w-100 mr-auto ml-auto">
            <Card
              className={classes.AuthCardContainer}
              bodyStyle={{ padding: 0 }}
            >
              <Tabs tabBarStyle={{ marginLeft: 15 }} defaultActiveKey="sign_in">
                <TabPane tab="Sign In" key="sign_in">
                  <LoginTab />
                </TabPane>
                <TabPane tab="Sign Up" key="sign_up">
                  <SignUpTab />
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // GO TO MAIN PAGE IF AUTHENTICATED.
    if (
      context.req?.headers?.cookie &&
      cookie.parse(context.req?.headers?.cookie)?.accessToken
    ) {
      context.res.setHeader("location", "/main");
      context.res.statusCode = 302;
      context.res.end();
      return;
    }

    return {
      props: {}, // will be passed to the page component as props
    };
  }
);

export default Home;
