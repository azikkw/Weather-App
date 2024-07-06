import axios from 'axios';

const API_KEY = "9235007df384403881e80548240307";
const BASE_URL = 'https://api.weatherapi.com/v1';

// Fetching weather information by city names
export const fetchWeeklyWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast.json`, {
            params: {
                key: API_KEY,
                q: city,
                days: 7
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};