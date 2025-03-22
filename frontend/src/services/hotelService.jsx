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