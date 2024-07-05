import citiesData from 'assets/data/cities.json';

// Search cities function
export const search = (query) => {
    query = query.trim().toLowerCase();
    const matchedCities = [];

    for(const country in citiesData) {
        const cities = citiesData[country];
        const filteredCities = cities.filter(city => city.toLowerCase().match(query));
        matchedCities.push(...filteredCities);
    }
    return matchedCities;
}