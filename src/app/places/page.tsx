
import type { GetServerSideProps } from "next";


var requestOptions:any = {
  method: 'POST',
  redirect: 'follow',
};

const classify = async (text:string) => {
  if (!text) return;

  const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

  const json = await result.json();

  return json;
  
};

 export async function getdata(){
  
    const res = await fetch('http://localhost:9000/nearbyplaces',requestOptions)
  const data = await res.json();
  const places = data.places
  // console.log("Data being fetched",typeof(places))
  return {places};
    
  }


 
  export default  async function page({data}:{data: any}) {
   const{places} = await getdata();
   
  
  let reviewofrest;
   for(const place in places){
     reviewofrest = places[place].reviews[0]
   } 

    const daaata = classify("This is amazing")
  let text = "omg this"
  console.log("Encoded parse URI op",encodeURIComponent(text))
  console.log("Encoded parse URI op",typeof encodeURIComponent(text))
  //  console.log("The response from the Classiy function", reviewofrest.text)
  //  const dataa = await getconsscore(reviewofrest.text.text);


  
    return (
      <div>
   
        <h1 className="text-6xl font-bold mb-2 text-center">The Restaurant Lists</h1>    
       <div>
        <h2 className="text-4xl font-bold mb-2 text-left" >Places Near you : </h2>
       {}
        
       </div>

      </div>
       
  
    )
  }
  
  const styles = {
    card: {
      width: '300px', // Adjust the width as needed
      margin: '10px',
      padding: '10px',
      borderRadius: '8px',
      borderColor: '#f5f5dc', // Beige color
      borderWidth: '1px',
      borderStyle: 'solid',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Set background color if needed
     
    },
  };