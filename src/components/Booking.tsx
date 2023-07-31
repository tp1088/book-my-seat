import { submitBooking } from "../services/seatServices"

export const Booking = ()=>{
    return (
        <div>
            <h1 >Booking</h1>
            <button onClick={submitBooking}>Book Seat</button>
        </div>
    )
}