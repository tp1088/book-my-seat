import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './BookingScreen.css';
import { fetchMetaData, fetchSeatsMetaData, setFloorsforDob, submitBooking } from '../services/seatServices';
import { Autocomplete } from '@mui/material';
import { useEffect} from "react";
import { setFlagsFromString } from 'v8';
import { bookings } from '../services/seatServices';

export interface SeatBookingFormData {
    id?:number;
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
    const [SeatAvlbl, setSeatAvlbl] = useState(() => true);
    const [SeatAvlblusingDate, setSeatAvlblusingDate] =useState(()=>true);
    const [Bdisabled,setDisabled] = useState(() => true);

    useEffect(() => {
        setFloors(fetchMetaData)
        setSeats(fetchSeatsMetaData(formData.floor))
    },[floor, setFloors])


    const setDataForDob = (dobEntered:string) =>{
        setFloorsforDob(dobEntered)
    }
    //Validating that if all seats are booked, If booked then throwing a msg stating "No seats are available"
    const ValidateSeat =():any =>{

        console.log(seat.length)
        if(seat.length === 0)
        {
            setSeatAvlbl(false)
            setDisabled(true)
        }
        else{
            setSeatAvlbl(true)
            setDisabled(false)
        }

    }

    //Checking if the seat booking is done by the same user
    const ValidateSeatwithDate =():any =>{
        setSeatAvlblusingDate(true)
        setDisabled(false)
        bookings.forEach(sdata =>{
           console.error(sdata.email)
           console.error(sdata.bookingDate)
            if(formData.email == sdata.email && formData.bookingDate == sdata.bookingDate)
            {
                setSeatAvlblusingDate(false)
                setDisabled(true)
            }
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setDataForDob(value)
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
            <h2 className = 'text-xl font-semibold'>Book Your Seat</h2>
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
                        onBlur={ValidateSeatwithDate}
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
                        onBlur={ValidateSeat}
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
                    <div>
                        {
                            !SeatAvlbl ? <h5 style={{color : 'red'}}>No seats are available</h5> : null
                        }
                        {
                            !SeatAvlblusingDate ? <h5 style={{color : 'red'}}>You have already booked Seat</h5> : null
                        }
                    </div>
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
                        onBlur={ValidateSeatwithDate}
                    />
                </div>
                <div className="form-group">
                    <Button type="submit" variant="contained" color="primary" disabled={Bdisabled}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Booking;
