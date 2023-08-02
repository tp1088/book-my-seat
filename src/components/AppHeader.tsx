import { useNavigate, Link, Outlet } from "react-router-dom";
import '../App.css';
import React, { useEffect } from "react";
import { fetchInitial } from "../services/seatServices";

export const AppHeader = () => {
    useEffect(() => {
        fetchInitial()
    }, [])
    return (
        <div className="header">
            <Link className="tab" to={'Booking'}  >Booking</Link>
            <Link className="tab" to={'admin'} >Office Admin</Link>
            <Outlet />
        </div>
    )
}