import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getAllCruises = async () => {
  try {
    const response = await axios.get(`${API_URL}/cruises`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cruises:', error);
    throw error;
  }
};

export const getCruiseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/cruises/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cruise with id ${id}:`, error);
    throw error;
  }
};

export const saveCruiseBooking = async (bookingData) => {
  try {
    console.log('Attempting to save cruise booking data:', bookingData);
    // Add timeout and logging for better debugging
    const response = await axios.post(`${API_URL}/cruise-bookings`, bookingData, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Cruise booking saved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving cruise booking:', error.message);
    if (error.response) {
      // The server responded with a status other than 200 range
      console.error('Server response data:', error.response.data);
      console.error('Server response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    }
    throw error;
  }
};