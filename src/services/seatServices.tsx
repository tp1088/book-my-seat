import { SeatBookingFormData } from '../components/Booking';
import data from '../resources/data.json'

export let bookings :Array<any> = [];

export const fetchInitial = (): any  => {
    bookings = data;
    return data;
}

export const fetchCurrentBookings = (): any  => {
    return bookings;
}

export const submitBooking = (form:SeatBookingFormData): boolean => {
    let temp :Array<any> = [];
    bookings.forEach(element => {
        temp.push(element)
    });
    
    temp.push({
        "id":bookings.length,
        "user": form.email,
        "floor":form.floor,
        "seat":form.seat,
        "bookingDate":form.bookingDate
    })
    bookings = temp;
    return true;
}