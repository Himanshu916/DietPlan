import axios from 'axios'
import React from 'react'
import {Link} from "react-router-dom"
 const DietCard = ({diet,from,setDiet,setDeleted}) => {
 

    const getLifeStyle=(lifeStyle)=>
    {
        switch(lifeStyle)
        {
            case "seden":
                return "Sedentary"
            default :
            return lifeStyle

        }
    }
    async function clickHandler(id)
    {
        try
        {
            await axios.delete("https://keto-diet-kyloapps.herokuapp.com/diet/"+id)
            setDeleted(true)
            setDiet([])
          
        }catch(error)
        {
            console.log(error.response)
        }

    } 
  
    return (
        <div id="dietCard" className="dietCard">
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
                    <h2>Weight</h2>
                    <h4>{diet.weight}</h4>
                </li>
                <li>
                    <h2>Height (mts)</h2>
                    <h4>{diet.height}</h4>
                </li>
                <li>
                    <h2>Gender</h2>
                    <h4>{diet.gender}</h4>
                </li>
                <li>
                    <h2>Nutrition Pref</h2>
                    <h4>{diet.nutritionPref}</h4>
                </li>
                <li>
                    <h2>Calorie/Snack</h2>
                    <h4>{diet.caloriesPerSnack} calories</h4>
                </li>
                <li>
                    <h2>LifeStyle</h2>
                    <h4>{getLifeStyle(diet.lifestyle)}</h4>
                </li>
                <li>
                    <h2>No. Of Meals</h2>
                    <h4>{diet.numberOfMeals}</h4>
                </li>
                <li>
                    <h2>No. Of Snacks</h2>
                    <h4>{diet.numberOfSnacks}</h4>
                </li>
                {/* <li>
                    <h2>Carbohydrates (grams)</h2>
                    <h4>{diet.carbs} grams</h4>
                </li> */}
                <li>
                    <h2>Total Calorie</h2>
                    <h4>{diet.tdee} calories</h4>
                </li>
                <li>
                    <h2>Diet Calories</h2>
                    <h4>{diet.remainingDeficit} calories</h4>
                </li>
               
                <li>
                    <h2>Carbohydate per day</h2>
                    <h4>{(diet.totalCarbs)/4} grams</h4>
                </li>
                <li>
                    <h2>Protein per day</h2>
                    <h4>{(diet.totalProteins)/4} grams</h4>
                </li>
                <li>
                    <h2> Fat per day </h2>
                    <h4>{diet.totalFats} grams</h4>
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
                <h4>{diet.tdee} calories</h4>
            </li>
              <li>
                  <h2>Total Fats</h2>
                  <h4>{diet.totalFats} grams</h4>
              </li>
              <li>
                  <h2>Total Carbohydates</h2>
                  <h4>{diet.totalCarbs} calories</h4>
              </li>
              <li>
                  <h2>Total Proteins</h2>
                  <h4>{(diet.totalProteins)/4} grams</h4>
              </li>
            </ul> 
           
            <Link onClick={()=>{window.location.hash = 'dietCard'}} className="button" style={{textDecoration:"none",textAlign:"center"}} to={`/diet/${diet.id}`}>
               View
            </Link>
            
            </>)}
           
        </div>
    )
}
export default DietCard


