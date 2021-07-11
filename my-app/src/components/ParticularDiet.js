import React,{useState,useEffect} from 'react'
import axios from "axios"
import {useParams,Link} from "react-router-dom"
import DietCard from './DietCard'
import SimilarDiets from './SimilarDiets';
import { WantSimilar } from './WantSimilar';
const ParticularDiet = () => {
    const {id} = useParams()
    const [diet,setDiet]=useState([])
    const [isWant,setWant] = useState(false)
    const [limits,setLimits] = useState(0)
    const [nutritionPref,setNutritionPref] = useState("");
    const [value, setValue] = useState([1, 7]);
    
    const [isShow,setShow] = useState(false)
    useEffect(()=>
    {

         (async()=>
    {
        try
        {
            const response = await axios.get("https://keto-diet-kyloapps.herokuapp.com/diet/"+id)
            if(response.status===200)
            setDiet(response.data)
            

        }catch(error)
        {
            console.log(error.response)

        }

    })()
    },[id])

    return (
        <>
        <div className="diets">
            {diet.length ===0 && <><div className="deleted">Item Deleted</div>
                <Link className="createDietPlan" style={{textDecoration:"none",cursor:"pointer",color:"green"}} to="/">
                    Want To Create More Diet Plan ? 
                </Link>
            </>}
            {diet.length!==0 && <DietCard key={diet?.id} from="particular" setDiet={setDiet} diet={diet[0]}/>}
            <p onClick={()=>{setWant(true)
            setShow(false)}} className="wantSimilarDiets"> Want to see more similar diets ?</p>
            {isWant && <div className="quantity">
            <p className="wantSimilarDiets">How many similar diets you want to see ?</p>
                <div className="quantity-box" >
               <WantSimilar value={value} setValue={setValue} limits={limits} nutritionPref={nutritionPref} setNutritionPref={setNutritionPref} setLimits={setLimits}  />
                <button onClick={()=>{
                    setShow(true)
                    // setValue([1, 7])
                    setWant(false)
                    }} className="button similar">Show</button>
                </div>
               
            </div> }
            
        </div>
        {
            isShow && <SimilarDiets value={value} quantity={limits}  diet={diet[0]}  nutritionPref={nutritionPref}  />
        }
        </>
    )
} 

export default ParticularDiet