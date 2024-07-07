export default defineEventHandler(async (event) => {

    const { city } = event.context.params;
    const { weatherKey } = useRuntimeConfig();

    const url = `https://api.weatherapi.com/v1/forecast.json`;

    try {
        return await $fetch(url, {
            params: {
                q: city,
                days: 7,
                key: weatherKey
            }
        });
    } catch(error) {
        console.error('Error fetching weather data', error);
    }

});