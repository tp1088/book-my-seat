import { SeatBookingFormData } from '../components/Booking';
import data from '../resources/data.json'
import meta from '../resources/metadata.json'


export interface MetaData {
    floorID: string;
    seats: Array<Seat>;
}
export interface Seat {
    seatID: string;
    isSelected: boolean;
}

export let bookings :Array<SeatBookingFormData> = [];
export let metadata :Array<MetaData> = [];

export const fetchInitial = (): any  => {
    bookings = data;
    metadata = meta;
    return data;
}

export const setFloorsforDob = (dob:String): any => {
    bookings.forEach(booking => {
        if(booking.bookingDate == dob){
           let mData =  metadata.find(m =>{
               return m.floorID === booking.floor
            })
            mData?.seats.forEach(seat => {
                if(seat.seatID === booking.seat){
                    seat.isSelected = true;
                }
            });
        }
    });
}
export const fetchMetaData = (): any  => {
    let f :Array<any> = [];
    metadata.forEach(mData => {
        f.push(mData.floorID)
    });
    return f;
}

export const fetchSeatsMetaData = (floor:String): any  => {
    let f: Array<any> = [];
    metadata.forEach(mData => {
        if (mData.floorID === floor) {
            mData.seats.forEach(s => {
                if (!s.isSelected) { f.push(s.seatID) }
            });
        }
    });
    return f;
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
        "email": form.email,
        "floor":form.floor,
        "seat":form.seat,
        "bookingDate":form.bookingDate
    })
    metadata.forEach(mData => {
        if(mData.floorID=== form.floor){
            mData.seats.forEach(s=>{
               if( s.seatID === form.seat){
                s.isSelected = true
               }
            })
        }
    });
    bookings = temp;
    return true;
}