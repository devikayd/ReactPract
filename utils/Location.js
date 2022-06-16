const GOOGLE_API_KEY = KEY


export function getLocationPreview(lat, lng){

const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

return imagePreviewUrl;
}

export async function getAddress(lat, long){

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`

    const response = await fetch(url);

    if(!response.OK){
        throw new Error('Failed to fetch address')
    }

    const data = await response.json();
    console.log('response: ', respose);
    console.log('data: ', data);

    const address = data.result[0].formatted_address;

    console.log('address', address);

    return address;

}