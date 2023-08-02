import { SeatBookingFormData } from '../components/Booking';
import data from '../resources/data.json'
import metadata from '../resources/metadata.json'

export let bookings :Array<any> = [];

export const fetchInitial = (): any  => {
    bookings = data;
    return data;
}

export const fetchMetaData = (): any  => {
    let f :Array<any> = [];
    metadata.forEach(mData => {
            // console.log(mData)
        f.push(mData.floorID)
    });
    return f;
}

export const fetchSeatsMetaData = (floor:String): any  => {
    let f :Array<any> = [];
    metadata.forEach(mData => {
        mData.seats.forEach(s=>{
            if(mData.floorID===floor)
            {
                if(!s.isSelected)
                    {f.push(s.seatID)}                
            }
            }); 
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
        "user": form.email,
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