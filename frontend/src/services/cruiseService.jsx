import * as httpRequest from '../utils/httpRequest';

export const getAllCruises = async () => {
    try {
        const response = await httpRequest.get('cruises');
        return response;
    } catch (error) {
        console.error('Failed to fetch cruises:', error);
        throw error;
    }
};

export const getCruiseById = async (id) => {
    try {
        return await httpRequest.get(`cruises/${id}`);
    } catch (error) {
        console.error(`Failed to fetch cruise with id ${id}:`, error);
        throw error;
    }
};

export const saveCruiseBooking = async (bookingData) => {
    try {
        console.log('Saving cruise booking data:', bookingData);
        const response = await httpRequest.post('cruise-bookings', bookingData);
        console.log('Cruise booking saved successfully:', response);
        return response;
    } catch (error) {
        console.error('Failed to save cruise booking:', error);
        throw error;
    }
};