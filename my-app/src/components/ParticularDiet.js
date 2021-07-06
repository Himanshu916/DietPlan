import React,{useState,useEffect} from 'react'
import axios from "axios"
import {useParams,Link} from "react-router-dom"
import DietCard from './DietCard'
import TextField from '@material-ui/core/TextField';
import SimilarDiets from './SimilarDiets';

const ParticularDiet = () => {
    const {id} = useParams()
    const [diet,setDiet]=useState([])
    const [isWant,setWant] = useState(false)
    const [limits,setLimits] = useState(0)
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
console.log(diet)
    return (
        <div>
            {diet.length ===0 && <><div className="deleted">Item Deleted</div>
                <Link className="createDietPlan" style={{textDecoration:"none",cursor:"pointer",color:"green"}} to="/">
                    Want To Create More Diet Plan ? 
                </Link>
            </>}
            {diet.length!==0 && <DietCard key={diet?.id} from="particular" setDiet={setDiet} diet={diet[0]}/>}
            <p onClick={()=>setWant(true)} className="wantSimilarDiets"> Want to see more similar diets ?</p>
            {isWant && <div className="quantity">
            <p className="wantSimilarDiets">How many similar diets you want to see ?</p>
                <div className="quantity-box" >
                <TextField style={{backgroundColor:"white"}} name="limit" onChange={(e)=>setLimits(e.target.value)} className="diet-details-input" id="standard-basic" value={limits} label="Quantity " />
                <button onClick={()=>setShow(true)} className="button similar">Show</button>
                </div>
               
                
            </div> }
            {
                isShow && <SimilarDiets quantity={limits} diet={diet[0]}/>
            }
        </div>
    )
}

export default ParticularDiet