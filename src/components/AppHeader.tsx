import {  Link, Outlet } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";
import { fetchInitial } from "../services/seatServices";

export const AppHeader = () => {
  useEffect(() => {
    fetchInitial();
  }, []);
  return (
    <header className="flex justify-between bg-black text-white p-4 h-14">
      <div>
        <p>Book-My-Seat</p>
      </div>
      <nav>
        <Link className="tab" to={"booking"}>
          Booking
        </Link>
        <Link className="tab" to={"admin"}>
          Office Admin
        </Link>
      </nav>
    </header>
  );
};
