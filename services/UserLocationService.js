// Get current geolocation of the user
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
                    window.location.reload();
                    reject('Error: ' + err.message);
                }
            )
        } else {
            reject('Geolocation is not supported by this browser.')
        }
    })
}