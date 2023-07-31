import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './BookingScreen.css';
import { submitBooking } from '../services/seatServices';

export interface SeatBookingFormData {
  floor: number;
  seat: string;
  bookingDate: string;
  email: string;
}

const Booking: React.FC = () => {
  const [formData, setFormData] = useState<SeatBookingFormData>({
    floor: 0,
    seat: '',
    bookingDate: '',
    email: '',
  });

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
      floor: 0,
      seat: 'Select a seat',
      bookingDate: '',
      email: '',
    });
  };

  return (
    <div className="container">
      <h2>Seat Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="floor">Floor</label>
          <TextField
            type="number"
            id="floor"
            name="floor"
            value={formData.floor}
            onChange={handleInputChange}
            required
            inputProps={{ min: '0' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="seat">Seat</label>
          <Select
            id="seat"
            name="seat"
            value={formData.seat}
            onChange={handleSelectChange}
            required
            label="Seat"
          >
            <MenuItem value="" disabled>Select a seat</MenuItem>
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="A3">A3</MenuItem>
          </Select>
        </div>
        <div className="form-group">
          <label htmlFor="bookingDate">Date</label>
          <TextField
            type="date"
            id="bookingDate"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <TextField
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
