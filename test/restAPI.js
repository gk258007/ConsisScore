
require('dotenv').config()

let hostname = 'worldwide-restaurants.p.rapidapi.com'
let header = {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_XRAPIDAPIKEY,
    'X-RapidAPI-Host': hostname
}
let search = {
    location_id: '15333491',
    language: 'en_US',
    currency: 'USD',
    offset: '0'
}

const callApi = async () => {
    const url = `https://${hostname}/reviews`
    const options = {
        method: 'POST',
        headers: header,
        body: new URLSearchParams(search)
    };
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
    } catch (err) {console.log(err)}
}

callApi()