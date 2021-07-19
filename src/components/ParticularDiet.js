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
    const [deleted,setDeleted] = useState(false)
    const [margin,setMargin] = useState(10)
    
    const [isShow,setShow] = useState(false)
    useEffect(()=>
    {

         (async()=>
    {
        try
        {
            const response = await axios.get("https://keto-diet-kyloapps.herokuapp.com/diet/"+id)
            console.log(response.data)
            if(response.status===200)
            setDiet(response.data)
            

        }catch(error)
        {
            console.log(error.response)

        }

    })()
    },[id])
const showHandler=()=>
{
   console.log(diet[0])
    setWant(true)
    setShow(false)
    setLimits(3)
    setNutritionPref(diet[0].nutritionPref)


}
    return (
        <>
        <div className="diets">
            {deleted && <><div className="deleted">Item Deleted</div>
                <Link className="createDietPlan" style={{textDecoration:"none",cursor:"pointer",color:"green"}} to="/">
                    Want To Create More Diet Plan ? 
                </Link>
            </>}
            {diet.length!==0 && <DietCard key={diet?.id} from="particular" setDeleted={setDeleted} setDiet={setDiet} diet={diet[0]}/>}
           {!deleted && <p onClick={showHandler} className="wantSimilarDiets"> Want to see more similar diets ?</p>}
            {isWant && <div className="quantity">
         <p className="wantSimilarDiets">How many similar diets you want to see ?</p>
                <div className="quantity-box" >
               <WantSimilar value={value} setValue={setValue} margin={margin} setMargin={setMargin} limits={limits} nutritionPref={nutritionPref} setNutritionPref={setNutritionPref} setLimits={setLimits}  />
                <button onClick={()=>{
                    setShow(true)
                    // setValue([1, 7])
                    setWant(false)
                    }} className="button similar">Show</button>
                </div>
               
            </div> }
            
        </div>
        {
            isShow && !deleted  && <SimilarDiets value={value} quantity={limits} margin={margin}  diet={diet[0]}  nutritionPref={nutritionPref}  />
        }
        </>
    )
} 

export default ParticularDiet