// Get current location of the user
export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    resolve({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    })
                },
                (err) => {
                    reject('Error: ' + err.message)
                }
            )
        } else {
            reject('Geolocation is not supported by this browser.')
        }
    })
}

// Find city by current location
export const fetchCity = async (lat, long) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&accept-language=en`
    try {
        const response = await fetch(url)
        const data = await response.json()

        if(data && data.address) return data.address.city || "City not found"
        else return 'Unable to fetch city name'
    }
    catch(err) {
        return 'Error: ' + err.message
    }
}