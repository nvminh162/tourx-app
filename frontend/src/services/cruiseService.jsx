// Ví dụ tạo cruiseService.jsx
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

export const createCruise = async (cruiseData) => {
    try {
        return await httpRequest.post('cruises', cruiseData);
    } catch (error) {
        console.error('Failed to create cruise:', error);
        throw error;
    }
};

export const updateCruise = async (id, cruiseData) => {
    try {
        return await httpRequest.put(`cruises/${id}`, cruiseData);
    } catch (error) {
        console.error(`Failed to update cruise with id ${id}:`, error);
        throw error;
    }
};

export const deleteCruise = async (id) => {
    try {
        return await httpRequest.delete(`cruises/${id}`);
    } catch (error) {
        console.error(`Failed to delete cruise with id ${id}:`, error);
        throw error;
    }
};