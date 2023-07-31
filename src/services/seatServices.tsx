import data from '../resources/data.json'

export interface bookingDetails {
    user: string,
    floor: string,
    seat: string,
    bookingDate: string
}

export let bookings :Array<any> = [];

export const fetchInitial = (): any  => {
    bookings = data;
    return data;
}

export const fetchCurrentBookings = (): any  => {
    return bookings;
}

export const submitBooking = (): boolean => {
    let temp :Array<any> = [];
    bookings.forEach(element => {
        temp.push(element)
    });
    
    temp.push({
        "id":bookings.length,
        "user": "nbdfsjh"+bookings.length
    })
    bookings = temp;
    return true;
}