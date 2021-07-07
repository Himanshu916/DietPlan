import axios from 'axios'
import React,{useEffect,useState} from 'react'
import DietCard from './DietCard'

const SimilarDiets = ({diet,quantity}) => {
   
    const dietNeedToSend= {nutritionPref:diet.nutritionPref, limit:Number(quantity), tdee:diet.tdee, margin:10, numberOfMeals:diet.numberOfMeals}
    const [similarDiets,setSimilarDiets] = useState([])
    useEffect(()=>
    {
        (async()=>
        {
            try
            {
               
                const {data} = await axios.post("https://keto-diet-kyloapps.herokuapp.com/similardiets",dietNeedToSend)
                setSimilarDiets(data)
                
            }
            catch(error)
            {
                console.log(error.response)
               
            }

        })()
    },[])
    return (
        <>
        <h1 className="heading"> Similar Diets </h1>
        {
            similarDiets.length===0 ? "Loading Diet" :  <div className="diets">
            {
                similarDiets?.map(diet=> <DietCard key={diet.id} diet={diet}/>)
            }
           
        </div>
        }
       
        </>
    )
}

export default SimilarDiets