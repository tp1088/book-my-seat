import { useEffect} from "react";
import React from "react";
import { DataGrid, GridPaginationModel, GridColDef } from "@mui/x-data-grid";
import { fetchCurrentBookings } from "../services/seatServices";
import './OfficeAdmin.css';

export const OfficeAdmin = () => {
  const [rows, setRows] = React.useState(() => []);
  const columns: GridColDef[] = [
    { field: "user", headerName: "User", width: 250 },
    { field: "floor", headerName: "Floor", width: 150 },
    { field: "seat", headerName: "Seat", width: 150 },
    { field: "bookingDate", headerName: "Booking Date", width: 250 },
  ];
  useEffect(() => {
    setRows(fetchCurrentBookings);
  }, []);
  return (
    <div>
      <h1 className="text-3xl mb-5"> Booking Details</h1>
      <div className="w-2/3 m-auto">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

