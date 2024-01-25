'use client'

import { useState } from 'react'


export default function Home() {

  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);
  const [final_scor,setFinalsco] = useState(null);

  async function  test(reviews){
    let final_score =0;
    let score = 0;
    let init_final_score =0;
    let pos_score=0
    let neg_score =0
    console.log("The length of the reviews",reviews.length)
    for (const review of reviews){
      const result= await classify(review[i].text)
     //console.log("The Score",result[0].score," the label ", result[0].label)
     if(result[0].label=='NEGATIVE')
     {
      score = -result[0].score.valueOf()
      
      neg_score = score + neg_score
      
     }else{
      score = result[0].score.valueOf()
      
      pos_score = score + pos_score
      
    }
    }
   
    init_final_score = pos_score+ neg_score
    console.log("positive score ", pos_score)
    console.log("NEgative score ", neg_score)
    console.log("Initial Final score", init_final_score)
    final_score = (init_final_score/reviews.length)*10
    console.log("The Final score ",final_score)
    //setFinalsco(final_score)
  }
  
  const callAPI = async () => {
    const url = 'https://worldwide-restaurants.p.rapidapi.com/reviews';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': process.env.NEXT_PUBLIC_XRAPIDAPIKEY,
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
      const res = await fetch(url,options);
      const data = await res.json();
      // var size = Object.keys(data).length;
      // let response_fromtest = await test(data.results.data)
      // // console.log("response fro mthe test ", response_fromtest)
      // // console.log("The length of the response data ",size)
      // // console.log("The Review from the restaurant ",data.results.data[3].text);
      // const result = await classify(data.results.data[3].text)
      //console.log(" Damn shit ",result[0].score)
    } catch (err) {
      console.log(err);
    }
  };
  const classify = async (text) => {
    if (!text) return;
    if (ready === null) setReady(false);
    // Make a request to the /classify route on the server.
    const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);
    //console.log("The text that is sent to the API",text)
    // If this is the first time we've made a request, set the ready flag.
    if (!ready) setReady(true);

    const json = await result.json();
    //console.log("The Result",json)
    return json;
    //setResult(json);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Consistency Calci</h1>
      <h2 className="text-2xl mb-4 text-center">Restaurant Zaplin's score is:</h2>
      {/* <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
        style={{color:'black'}}
        placeholder="Enter text here"
        onInput={e => {
          classify(e.target.value);
        }}
      />
    */}
      {/* {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded" style={{color:'red'}}>
          {
            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}  */}
      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded" style={{color:'red'}}>
        {
          (!ready && !final_scor) ? 'Loading...' : JSON.stringify(final_scor, null, 2)}
      </pre>
      )}
      <button onClick={test}>Click to Analyse</button>
      <button onClick={callAPI}>Click to test API</button>
    </main>
  )
}