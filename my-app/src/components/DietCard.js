import axios from 'axios'
import React from 'react'
import {Link} from "react-router-dom"
 const DietCard = ({diet,from,setDiet}) => {
 
    async function clickHandler(id)
    {
        try
        {
            await axios.delete("https://keto-diet-kyloapps.herokuapp.com/diet/"+id)
            setDiet([])
          
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
                    <h2>Phone No.</h2>
                    <h4> {diet.phone} </h4>
                </li>
                <li>
                    <h2>Email</h2>
                    <h4> {diet.email}</h4>

                </li>
                
                <li>
                    <h2>Age</h2>
                    <h4>{diet.age}</h4>
                </li>
                <li>
                    <h2>Height</h2>
                    <h4>{diet.height}</h4>
                </li>
                <li>
                    <h2>Gender</h2>
                    <h4>{diet.gender}</h4>
                </li>
                <li>
                    <h2>Weight</h2>
                    <h4>{diet.weight}</h4>
                </li>
                <li>
                    <h2>Nutrition Pref</h2>
                    <h4>{diet.nutritionPref}</h4>
                </li>
                <li>
                    <h2>Total Calories</h2>
                    <h4>{diet.tdee}</h4>
                </li>
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
            <Link className="button" style={{textDecoration:"none",textAlign:"center"}} to={`/update/${diet.id}`}>
                   Update Plan
            </Link>
            </div>
            
            </>): ( <> <ul>
            <li>
                <h2>Phone No.</h2>
                <h4> {diet.phone} </h4>
            </li>
            <li>
                <h2>Email</h2>
                <h4> {diet.email}</h4>

            </li>
            <li>
                <h2>Total Calories</h2>
                <h4>{diet.tdee}</h4>
            </li>
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
            </Link>
            
            </>)}
           
        </div>
    )
}
export default DietCard


