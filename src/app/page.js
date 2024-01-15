'use client'

import { useState } from 'react'


export default function Home() {

  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);
  const [final_scor,setFinalsco] = useState(null);

  async function  test(){
    const mssg = ["Bad it is and kinda Good","This Bad Man","how is it even this cool omg","Lets get going!! Good Taste"]
    let final_score =0;
    for(let i=0;i<mssg.length;i++)
    {
     const result= await classify(mssg[i])
     final_score = result[0].score + final_score
     //console.log("iterated final scores",final_score)
     //console.log("From the function itself",result[0].score,"the iteration number",i)
    }
    //console.log("The Final score ",final_score)
    setFinalsco(final_score)
  }
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
    </main>
  )
}