import { useEffect } from 'react';
import { getAllHotelBookings } from '../../services/hotelService';
import { getAllCruiseBookings } from '../../services/cruiseService';

const ApiDebugger = () => {
    useEffect(() => {
        // Log environment variables for debugging
        console.log('Environment variables:');
        console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL);
        
        // Test API connections
        const testApis = async () => {
            try {
                console.log('Testing hotel bookings API...');
                const hotelResponse = await getAllHotelBookings();
                console.log('Hotel bookings response:', hotelResponse);
            } catch (error) {
                console.error('Hotel bookings API test failed:', error);
            }
            
            try {
                console.log('Testing cruise bookings API...');
                const cruiseResponse = await getAllCruiseBookings();
                console.log('Cruise bookings response:', cruiseResponse);
            } catch (error) {
                console.error('Cruise bookings API test failed:', error);
            }
        };
        
        testApis();
    }, []);
    
    return null; // This component doesn't render anything
};

export default ApiDebugger;