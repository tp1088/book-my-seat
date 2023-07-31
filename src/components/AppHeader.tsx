import { useNavigate, Link, Outlet } from "react-router-dom";
import '../App.css';

export const AppHeader = () => {
    const navigateTo = useNavigate();
    return (
        <div className="header">
            <Link className="tab" to={'Booking'}  >Booking</Link>
            <Link className="tab" to={'admin'} >Office Admin</Link>
            <Outlet />
        </div>
        
    )
}