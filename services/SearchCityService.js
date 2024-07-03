import citiesData from '~/assets/data/cities.json';

export const search = (query) => {
    return citiesData.filter(city => city.name.match(query));
}

export const randomCitiesList = async (country, count) => {
    if(!Array.isArray(citiesData) || citiesData.length === 0 || count <= 0) {
        return [];
    }

    const filteredData = citiesData.filter(item => item.country === country);
    const randomValues = [];

    // Generate unique random indices
    const indices = new Set();
    while(indices.size < count) {
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        indices.add(randomIndex);
    }

    // Convert Set to Array and retrieve values
    Array.from(indices).forEach(index => {
        randomValues.push(filteredData[index]);
    });

    return randomValues;
}