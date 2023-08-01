import { useEffect } from "react";
import React from "react";
import { DataGrid, GridPaginationModel, GridColDef } from "@mui/x-data-grid";
import { fetchCurrentBookings } from "../services/seatServices";

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
    <div className="">
      <h2 className = 'text-left text-3xl'> Booking Details</h2>
      <section className = 'w-2/3 m-auto'>
        <DataGrid rows={rows} columns={columns} />
      </section>
    </div>
  );
};
