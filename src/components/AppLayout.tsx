import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
export const AppLayout = () => {
  return (
    <div className="min-h-screen ">
      <div className="m-4 h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
