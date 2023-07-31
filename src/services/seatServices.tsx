import data from '../resources/data.json'

export interface bookingDetails {
    user: string,
    floor: string,
    seat: string,
    bookingDate: string
}

export const fetchBookings = (): any  => {
    return data;
}

export const submitBooking = (): boolean => {
    console.log('submitBooking ')
    return true;
}