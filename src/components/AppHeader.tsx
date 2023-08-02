import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";
import { fetchInitial } from "../services/seatServices";

export const AppHeader = () => {
  useEffect(() => {
    fetchInitial();
  }, []);
  const style = "hover:bg-sky-700 hover:h-14 mx-4";
  return (
    <header className="bg-black text-white flex justify-between h-14 items-center px-4">
      <div>
        <Link className="hover:bg-sky-700 text-2xl font-bold" to={"booking"}>
          Book My Seat
        </Link>
      </div>
      <nav>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? `text-xl  font-bold ${style} ` : `${style}`
          }
          to={"booking"}
        >
          Booking
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? `text-xl font-bold ${style} ` : `${style}`
          }
          to={"admin"}
        >
          Office Admin
        </NavLink>
      </nav>
    </header>
  );
};
