import { fetchBookings } from "../services/seatServices"
import { useEffect} from "react";
import React from "react";
import { DataGrid, GridPaginationModel, GridColDef } from '@mui/x-data-grid';

export const OfficeAdmin = ()=>{
    const [rows, setRows] = React.useState(() => []);
    const columns: GridColDef[] = [
        { field: 'user', headerName: 'User', width: 150 },
        { field: 'floor', headerName: 'Floor', width: 150 },
        { field: 'seat', headerName: 'Seat', width: 150 },
        { field: 'bookingDate', headerName: 'Booking Date', width: 250 }
    ];
    useEffect(() => {
        setRows(fetchBookings())
    }, [])
    return (
        <div>
            <h1 >Admin</h1>

            <DataGrid
                // disableRowSelectionOnClick checkboxSelection 
                rows={rows}
                columns={columns}
            />
        </div>
    )
}