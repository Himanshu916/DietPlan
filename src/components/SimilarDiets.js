import axios from 'axios'
import React,{useEffect,useState} from 'react'
import DietCard from './DietCard'



const SimilarDiets = ({diet,quantity,from,value,nutritionPref,margin}) => {
    let diety;
    const [similarDiets,setSimilarDiets] = useState([])
   
    
    if(from)
    {
        diety={nutritionPref:diet.nutritionPref, limit:Number(quantity), tdee:Number(diet.tdee), margin:margin, numberOfMeals:[1,7]}
    }
    else
    {
        diety={nutritionPref:nutritionPref, limit:quantity?Number(quantity):0, tdee:Number(diet.tdee), margin:10, numberOfMeals:value}
    }
   
    useEffect(()=>
    {
        
        (async()=>
        {
            
            if(diety)
            {
            try
            {
               
                const {data} = await axios.post("https://keto-diet-kyloapps.herokuapp.com/similardiets",diety)
                setSimilarDiets(data)
                
            }
            catch(error)
            {
                console.log(error.response)
               
            }
        }

        })()
    },[])
   
  similarDiets.sort((a,b)=>
    {
       return Date.parse(a.timestamp) - Date.parse(b.timestamp)
    });
   
    return (
        <>
        <h1 className="heading"> Similar Diets </h1>
        {
            similarDiets.length===0 ? <div className="noSimilar">NO Similar Diet Available</div> :  <div  className="diets">
            {
                similarDiets?.map(diet=> <DietCard key={diet.id} diet={diet}/>)
            }
           
        </div>
        }
       
        </>
    )
}

export default SimilarDiets



