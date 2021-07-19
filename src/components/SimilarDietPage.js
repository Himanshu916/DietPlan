import React,{useState} from 'react'
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import RangeSlider from './MealsRange';
import SimilarDiets from './SimilarDiets';

const SimilarDietPage = () => {
    const [diet,setDiet]=useState({tdee:""})
    const [isShow,setShow] = useState(false)
    const [limits,setLimits] = useState(0)
    const [nutritionPref,setNutritionPref] = useState("");
    const [value, setValue] = useState([1, 7]);
    const [margin,setMargin] = useState()
    const [wantToSee,setWantToSee] = useState(false)


  
    return (
        <>
        <div className="diets">
        {wantToSee&&<p onClick={()=>{setWantToSee(false)
        setShow(false)}}  className="wantSimilarDiets"> Want to see more similar diets ?</p>}
        {!wantToSee && <div className="quantity">
        <p className="wantSimilarDiets">How many similar diets you want to see ?</p>
            <div className="quantity-box" >
            <>
                <TextField  style={{backgroundColor:"white"}} name="limit" onChange={(e)=>setLimits(e.target.value)} className="diet-details-input quantity-box-inner" id="standard-basi" value={limits} label="Quantity " />
                <TextField  style={{backgroundColor:"white",marginTop:"1rem"}} name="tdee" onChange={(e)=>setDiet({tdee:e.target.value})} className="diet-details-input quantity-box-inner" id="standard-basic" value={diet.tdee} label="Total Calories " />
                <FormControl className="diet-details-input" component="fieldset">
                <FormLabel component="legend">Nutrition</FormLabel>
                <RadioGroup value={nutritionPref} onChange={(e)=>setNutritionPref(e.target.value)}  aria-label="nutrition"  name="nutritionPref" >
                    <FormControlLabel value="veg" control={<Radio />} label="Vegetarian" />
                    <FormControlLabel value="nonveg" control={<Radio />} label="Non-Vegetarian" />
                    <FormControlLabel value="vegwithegg" control={<Radio />} label="Vegetarian & Egg" />
                </RadioGroup>
                </FormControl>
                <TextField name="margin" style={{marginBottom:"10px",backgroundColor:"white"}} value={margin} onChange={(e)=>setMargin(e.target.value)}  className="diet-details-input"  id="standard-basic" label="Margin percentage" type="number"/>
                <RangeSlider value={value} setValue={setValue}/>
                        
      </>
            <button onClick={()=>{
                setShow(true)
                 setWantToSee(true)
                // setValue([1, 7])
                window.location.hash = 'show';
                }} className="button similar">Show</button>
            </div>
           
        </div> }
        
    </div>
    <div id="show">

    
     {
        isShow && <SimilarDiets value={value} quantity={limits}  diet={diet}  nutritionPref={nutritionPref}  />
    }
    </div>
    </>
    )
}


export default SimilarDietPage