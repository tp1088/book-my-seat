import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './BookingScreen.css';
import { fetchMetaData, fetchSeatsMetaData, submitBooking } from '../services/seatServices';
import { Autocomplete } from '@mui/material';
import { useEffect} from "react";
import { setFlagsFromString } from 'v8';

export interface SeatBookingFormData {
    floor: string;
    seat: string;
    bookingDate: string;
    email: string;
}

const Booking: React.FC = () => {
    const [formData, setFormData] = useState<SeatBookingFormData>({
        floor: '',
        seat: '',
        bookingDate: '',
        email: '',
    });

    let floors :Array<any> = [];

    const [floor, setFloors] = useState(() => []);
    const [seat, setSeats] = useState(()=> []);

    useEffect(() => {
        setFloors(fetchMetaData)
        setSeats(fetchSeatsMetaData(formData.floor))
    },[floor, setFloors])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        submitBooking(formData)
        alert(
            `Form submitted successfully!\nFloor: ${formData.floor}\nSeat: ${formData.seat}\nDate: ${formData.bookingDate}\nEmail: ${formData.email}`
        );

        // Reset the form after successful submission
        setFormData({
            floor: '',
            seat: 'Select a seat',
            bookingDate: '',
            email: '',
        });
    };

    return (
        <div className="container bg-slate-200 opacity-90">
            <h2>Seat Booking Form</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="bookingDate">Date</label>
                    <TextField
                        style={{ width: "250px" }}
                        type="date"
                        id="bookingDate"
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                <label htmlFor="seat">Floor</label>
                    <Select
                        style={{ width: "250px" }}
                        id="floor"
                        name="floor"
                        value={formData.floor}
                        onChange={handleSelectChange}
                        required
                        label="Floor"
                    >
                        <MenuItem value="" disabled>Select a Floor</MenuItem>
                        {floor.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="form-group">
                    <label htmlFor="seat">Seat</label>
                    <Select
                        style={{ width: "250px" }}
                        id="seat"
                        name="seat"
                        value={formData.seat}
                        onChange={handleSelectChange}
                        required
                        label="Seat"
                    >
                        <MenuItem value="" disabled>Select a seat</MenuItem>
                        {seat.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <TextField
                        style={{ width: "250px" }}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Booking;
