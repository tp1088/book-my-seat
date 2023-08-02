import { useEffect} from "react";
import React from "react";
import { DataGrid, GridPaginationModel, GridColDef } from "@mui/x-data-grid";
import { fetchCurrentBookings } from "../services/seatServices";
import './OfficeAdmin.css';
import { useState } from "react";

export const OfficeAdmin = () => {
  const [rows, setRows] = React.useState(() => []);
  const columns: GridColDef[] = [
    { field: "email", headerName: "User", width: 250 , },
    { field: "floor", headerName: "Floor", width: 150 },
    { field: "seat", headerName: "Seat", width: 150 },
    { field: "bookingDate", headerName: "Booking Date", width: 250 },
  ];
  useEffect(() => {
    setRows(fetchCurrentBookings);
  }, []);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5
  })
  return (
    <div>
      <h1 className="text-3xl mb-5  font-semibold"> Booking Details</h1>
      <div className="w-2/3 m-auto bg-slate-50 opacity-90">
        <DataGrid rows={rows} columns={columns} 
        pagination
        paginationMode='client'
        paginationModel={paginationModel}
        onPaginationModelChange={(paginationModel: GridPaginationModel) => setPaginationModel(paginationModel)}
        pageSizeOptions={[5, 10, 25]}/>
      </div>
    </div>
  );
};

