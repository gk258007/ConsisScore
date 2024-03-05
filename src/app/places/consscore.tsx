"use client";
import React, { useEffect, useState } from "react";
const myJson:any = {};
const classify = async (text: string) => {
  
  const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

  const json = await result.json();

  return json;
};

async function getcc(name:any,resta:any) {
  //console.log("The restaurant's:",name," Reviews ",resta)
  let total=0;
  const sentimentPromises = [];

  //console.log("The size of the array after before pushed 🫸🫸 ", sentimentPromises.length)
  //console.log("the size of the array", resta.length)
  console.log(name)
  try{
    //sentimentPromises.push(name)
    for(let i =0;i<resta.length;i++)
    {
     // console.log("teh reviews of the restaurant",resta[i].text)
      let sentiscore = await classify(resta[i].text.text)
      sentimentPromises.push(sentiscore)
    
    }
    const sentiscore = await Promise.all(sentimentPromises);
    let sum =0;
    sentiscore.forEach(item=>{
      //console.log(item[0].score)
      sum += item[0].score
  
    })
     total = sum/5*100
    console.log("the Consistency score of the restaurant",name, " is ",total)
    const keys = ["Name", "Score"]; // Array of keys
   
    
    myJson["Data"] = myJson["Data"] || [];

    
    myJson["Data"].push({ Name: name, Score: total });
    
    console.log("Data from the JSON Parse function",JSON.stringify(myJson));
  
//OMGTHINS

  }catch(e){
    console.log("Error in the sentiment score it didnt run man",e)
  }

  console.log("The size of the array after being pushed 🫸🫸 ", sentimentPromises.length)
return total;
}


async function callme(reviews: any) {
  let score_arr=0;
  // console.log("initial score", score_arr)
  // console.log("The data being received",typeof(reviews))
  try{
    for(const key of Object.keys(reviews))
    {
      //console.log("The restaurant's:",reviews[key].displayName.text," Reviews : ",reviews[key].reviews)
      await  getcc(reviews[key].displayName.text,reviews[key].reviews)
    }
  }catch(err){
    console.log("Some error occured",err)
  }
  

}

export default  function Consscore({ listedplace }: { listedplace: any }) {
  const[consscore,setcConsScore] = useState(0);
  useEffect(()=>{
   callme(listedplace)
  },[callme])
  function getData(){
   console.log(myJson)
    
  }
  return (
    <>
      {/* <div key={listedplace.id}>Consscore:{listedplace[0].displayName.text}</div> */}
      <div>
        <h2 className="mb-2 text-left text-4xl font-bold">
          Places Near you :{" "}
        </h2>
        {listedplace.map((places: any) => (
          <div key={places.id} style={styles.card}>
            <h3>{places.displayName.text}</h3>
            <p>Consistency Score: {consscore}</p>
          </div>
        ))}
        <button onClick={() => getData()}>Click to classify</button>
      </div>
    </>
  );
}

const styles = {
  card: {
    width: "300px",
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
    borderColor: "#f5f5dc",
    borderWidth: "1px",
    borderStyle: "solid",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};