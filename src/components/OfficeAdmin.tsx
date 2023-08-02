
import { useEffect} from "react";
import React from "react";
import { DataGrid, GridPaginationModel, GridColDef } from '@mui/x-data-grid';
import { fetchCurrentBookings } from "../services/seatServices";


export const OfficeAdmin = ()=>{
    const [rows, setRows] = React.useState(() => []);
    const columns: GridColDef[] = [
        { field: 'user', headerName: 'User', width: 250 },
        { field: 'floor', headerName: 'Floor', width: 150 },
        { field: 'seat', headerName: 'Seat', width: 150 },
        { field: 'bookingDate', headerName: 'Booking Date', width: 250 }
    ];
    useEffect(() => {
        setRows(fetchCurrentBookings)
    }, [])
    return (
        <div>
            <h1> Booking Details</h1>

            <DataGrid
                rows={rows}
                columns={columns}
            />
        </div>
    )
}