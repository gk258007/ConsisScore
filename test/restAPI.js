
// require('dotenv').config()
const { NEXT_PUBLIC_XRAPIDAPIKEY } = process.env


const callApi = async () => {
    const url = 'https://worldwide-restaurants.p.rapidapi.com/reviews';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'e3ff25b962msh585e4f27493fb2dp1f6e48jsn069d06c3cfe4',
            'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
        },
        body: new URLSearchParams({
            location_id: '15333491',
            language: 'en_US',
            currency: 'USD',
            offset: '0'
        })
    };
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        // var size = Object.keys(data).length;
        // let response_fromtest = await test(data.results.data)
        // const result = await classify(data.results.data[3].text)
    } catch (err) {
        console.log(err);
    }
}

callApi()