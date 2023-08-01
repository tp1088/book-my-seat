import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppHeader } from "./components/AppHeader";
import { Route, Routes } from "react-router-dom";
import Booking from "./components/Booking";
import { OfficeAdmin } from "./components/OfficeAdmin";
import { AppLayout } from "./components/AppLayout";

function App() {
  return (
    <>
      <div className="App bg-[#F0F2F3]">
        <AppHeader />
      </div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index path="/" element={<Booking />}></Route>
          <Route path="booking" element={<Booking />}></Route>
          <Route path="admin" element={<OfficeAdmin />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
