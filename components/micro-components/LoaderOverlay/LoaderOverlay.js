import React from "react";
import classes from "./LoaderOverlay.module.scss";
import { Spin } from "antd";

const LoaderOverlay = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "white",
          opacity: 0.5,
          zIndex: 1000,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%, 0)",
          zIndex: 1001,
        }}
      >
        <Spin size="large" />
      </div>
    </>
  );
};

export default LoaderOverlay;
