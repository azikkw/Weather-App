export default defineEventHandler(async (event) => {

    const { city } = event.context.params;
    const { weatherKey } = useRuntimeConfig();

    console.log(weatherKey);
    const url = `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${weatherKey}`;

    const { data } = await $fetch(url);

    return data;

});