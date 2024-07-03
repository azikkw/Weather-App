import axios from 'axios';

const API_KEY = "9235007df384403881e80548240307";
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: city
            },
        });
        return response.data;
    } catch(error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

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

// const API_KEY2 = "ebc6db92fb6dbb1c0bfe3bdc4678492e";
// const BASE_URL2 = 'https://api.openweathermap.org/data/3.0';
//
// export const fetchWeather2 = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL2}/onecall`, {
//             params: {
//                 lat: 33.44,
//                 lon: -94.04,
//                 appid: API_KEY2,
//                 units: 'metric',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         throw error;
//     }
// };