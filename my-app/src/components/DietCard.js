import axios from 'axios'
import React from 'react'
import {Link} from "react-router-dom"
 const DietCard = ({diet,from,setDiet}) => {
 
    async function clickHandler(id)
    {
        try
        {
            const {data}=await axios.delete("https://keto-diet-kyloapps.herokuapp.com/diet/"+id)
            setDiet([])
            console.log(data)
        }catch(error)
        {
            console.log(error.response)
        }

    }
    return (
        <div className="dietCard">
            <h2>{diet.name}</h2>
            {from === "particular" ? (<><ul>
              <li>
                  <h2>Total Fats</h2>
                  <h4>{diet.totalFats}</h4>
              </li>
              <li>
                  <h2>Total Carbohydates</h2>
                  <h4>{diet.totalCarbs}</h4>
              </li>
              <li>
                  <h2>Total Proteins</h2>
                  <h4>{diet.totalProteins}</h4>
              </li>
            </ul>
            <div className="btn-particular">
            <button className="button " onClick={()=>clickHandler(diet.id)} >Delete</button>
            <Link className="button" style={{textDecoration:"none",textAlign:"center"}} to="/update">
                   Update Plan
                </Link>
            </div>
            
            </>): ( <><ul>
              <li>
                  <h2>Total Fats</h2>
                  <h4>{diet.totalFats}</h4>
              </li>
              <li>
                  <h2>Total Carbohydates</h2>
                  <h4>{diet.totalCarbs}</h4>
              </li>
              <li>
                  <h2>Total Proteins</h2>
                  <h4>{diet.totalProteins}</h4>
              </li>
            </ul>
            <Link className="button" style={{textDecoration:"none",textAlign:"center"}} to={`/diet/${diet.id}`}>
               View
            </Link></>)}
           
        </div>
    )
}
export default DietCard
