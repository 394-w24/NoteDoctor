import React from "react";
import { Outlet } from "react-router-dom";
import { DateHeader } from "../components/DateHeader";

const Layout = () => {
  return (
    <div className="min-h-svh">
      <DateHeader />
      <Outlet />
    </div>
  );
};

export default Layout;
