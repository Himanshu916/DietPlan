import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import DietCard from './DietCard'
const AllDiet = () => {
    const [allDiets,setAllDiets] = useState([])
    useEffect(()=>
    {
        (async()=>
        {
            try
            {
                const {data} = await axios.get("https://keto-diet-kyloapps.herokuapp.com/alldiets");
                setAllDiets(data);
            }catch(error)
            {
                console.log(error.response)
            }
        })()
    },[])
    return (
        <>
        <h1 className="heading"> All Diet Plans </h1>
        <div className="diets">
            {
                allDiets.map(diet=> <DietCard key={diet.id}  diet={diet}/>)
            }
           
        </div>
        </>
    )
}

export default AllDiet;