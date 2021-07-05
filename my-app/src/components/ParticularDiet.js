import React,{useState,useEffect} from 'react'
import axios from "axios"
import {useParams,Link} from "react-router-dom"
import DietCard from './DietCard'

const ParticularDiet = () => {
    const {id} = useParams()
    const [diet,setDiet]=useState([])
    useEffect(()=>
    {

         (async()=>
    {
        try
        {
            const response = await axios.get("https://keto-diet-kyloapps.herokuapp.com/diet/"+id)
            if(response.status===200)
            setDiet(response.data)
            console.log(response,"bb")

        }catch(error)
        {
            console.log(error.response,"hh")

        }

    })()
    },[id])

    return (
        <div>
            {diet.length ===0 && <><div className="deleted">Item Deleted</div>
                <Link className="createDietPlan" style={{textDecoration:"none",cursor:"pointer",color:"green"}} to="/">
                    Want To Create More Diet Plan ? 
                </Link>
            </>}
            {diet.length!==0 && <DietCard key={diet?.id} from="particular" setDiet={setDiet} diet={diet[0]}/>}
        </div>
    )
}

export default ParticularDiet