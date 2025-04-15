import * as httpRequest from '../utils/httpRequest';

export const createHotel = async (hotelData) => {
    try {
        return await httpRequest.post('hotel', hotelData);
    } catch (error) {
        console.error('Failed to create hotel:', error);
        throw error;
    }
};

export const getAllHotels = async () => {
    try {
        const response = await httpRequest.get('hotel');
        return response;
    } catch (error) {
        console.error('Failed to fetch hotels:', error);
        throw error;
    }
};

export const getHotelById = async (id) => {
    try {
        return await httpRequest.get(`hotel/${id}`);
    } catch (error) {
        console.error(`Failed to fetch hotel with id ${id}:`, error);
        throw error;
    }
};

export const updateHotel = async (id, hotelData) => {
    try {
        return await httpRequest.put(`hotel/${id}`, hotelData);
    } catch (error) {
        console.error(`Failed to update hotel with id ${id}:`, error);
        throw error;
    }
};

export const deleteHotel = async (id) => {
    try {
        return await httpRequest.delete(`hotel/${id}`);
    } catch (error) {
        console.error(`Failed to delete hotel with id ${id}:`, error);
        throw error;
    }
};


// BOOKING
export const saveHotelBooking = async (bookingData) => {
    try {
        console.log('Saving hotel booking data:', bookingData);
        const response = await httpRequest.post('hotel-bookings', bookingData);
        console.log('Hotel booking saved successfully:', response);
        return response;
    } catch (error) {
        console.error('Failed to save hotel booking:', error);
        throw error;
    }
};

export const getAllHotelBookings = async () => {
    try {
        console.log('Fetching all hotel bookings...');
        const response = await httpRequest.get('hotel-bookings');
        console.log('Hotel bookings API response:', response);
        return response;
    } catch (error) {
        console.error('Failed to fetch hotel bookings:', error);
        throw error;
    }
};

export const searchHotelBookings = async (field, query) => {
    try {
        console.log(`Searching hotel bookings with ${field}=${query}`);
        const response = await httpRequest.get(`hotel-bookings/search?field=${field}&query=${query}`);
        console.log('Search hotel bookings API response:', response);
        return response;
    } catch (error) {
        console.error(`Failed to search hotel bookings with ${field}=${query}:`, error);
        throw error;
    }
};