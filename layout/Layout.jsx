import React from "react";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
