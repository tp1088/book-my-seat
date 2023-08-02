import React from "react";
import { Outlet } from "react-router-dom";

import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";

export const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className = 'min-h-screen p-4'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
