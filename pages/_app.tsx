import "bootstrap/scss/bootstrap.scss";
import "antd/dist/antd.css";
import "../styles/antd.less";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { wrapper } from "../store/configureStore";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
