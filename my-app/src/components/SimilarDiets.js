import axios from 'axios'
import React,{useEffect} from 'react'


const SimilarDiets = ({diet,quantity}) => {
    const {nutritionPref, limit=Number(quantity), tdee, margin=10, numberOfMeals} = diet;
    console.log({nutritionPref, limit, tdee, margin, numberOfMeals} )
    useEffect(()=>
    {
        (async()=>
        {
            try
            {
               
                const {data} = await axios.get("https://keto-diet-kyloapps.herokuapp.com/similardiets")
                console.log(data)
            }
            catch(error)
            {
                console.log(error.response)
            }

        })()
    },[])
    return (
        <div>
            coming soon
        </div>
    )
}

export default SimilarDiets