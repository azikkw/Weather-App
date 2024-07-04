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

// Get 10 random city for Other Cities Weather section
export const randomCitiesList = async (count) => {
    const allCities = [];
    for(const country in citiesData) {
        allCities.push(...citiesData[country]);
    }

    if(allCities.length === 0 || count <= 0) {
        return [];
    }

    const randomValues = [];
    const indices = new Set();

    while(indices.size < count) {
        const randomIndex = Math.floor(Math.random() * allCities.length);
        indices.add(randomIndex);
    }

    Array.from(indices).forEach(index => {
        randomValues.push(allCities[index]);
    });

    return randomValues;
}