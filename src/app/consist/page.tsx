'use client'

import { useState } from 'react'



export default function Home() {

  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);
  const [final_scor,setFinalsco] = useState(0);



  async function  test(reviews){
    let init_score = 0;
    let init_positive_score =0;
    let init_negative_score =0;
    let score = 0;
    let pos_score=0
  let neg_score =0
  let pos_count =0;
  let neg_count=0;
  let  weight_score_neg =0
  let weight_score_pos =0;
  let false_positive_score = 0;
 
    for (const review of reviews){
      const result= await classify(review.text)
     
     console.log(result)
      if(result[0].label==='NEGATIVE')
     {
      score = -result[0].score.valueOf()
      neg_score = score + neg_score
      neg_count +=1
      console.log("negative count incremented ", neg_count)
     }else{
      score = result[0].score.valueOf()
      pos_score = score + pos_score
      pos_count += 1
      console.log("positive count incremented ", pos_count)
      
    }
    }
    init_negative_score = (neg_score/reviews.length) + 1
    init_positive_score = pos_score/reviews.length
    init_score = (init_negative_score+init_positive_score)/2*5
    setFinalsco(init_score)
    console.log("Actual scores", neg_score,"pos: ",pos_score)
    console.log("init score",init_score)
    console.log("Init negative score",init_negative_score,"init positive score",init_positive_score)
    //setFinalsco(final_score)
  }
  //"Sat down at the table and ordered two appetizer items and beers.  The beers came soon, but after asking the waiter three times over the next 1 hour and 20 minutes about our food, he just stopped answering and shook his head.  I eventually walked inside to pay the bill....after I had them remove the non-existent food.  Whatever, I guess"
  const callAPI = async () => {
    const url = 'https://restaurants222.p.rapidapi.com/reviews';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': process.env.NEXT_PUBLIC_XRAPIDAPIKEY,
		'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com'
	},

  //15333491
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
      var size = Object.keys(data).length;
      console.log("The data being sent to test function ",data.results.data)
      let response_fromtest = await test(data.results.data)
      // console.log("response fro mthe test ", response_fromtest)
      // console.log("The length of the response data ",size)
      // console.log("The Review from the restaurant ",data.results.data[3].text);
      // const result = await classify(data.results.data[3].text)
      // console.log(" Damn shit ",result[0].score)
    } catch (err) {
      console.log(err);
    }
  };
  const classify = async (text) => {
    if (!text) return;
    if (ready === null) setReady(false);
    
    const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);
    
    if (!ready) setReady(true);

    const json = await result.json();
  
    return json;

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
      <button onClick={callAPI}>Click to test API</button>
    </main>
  )
}