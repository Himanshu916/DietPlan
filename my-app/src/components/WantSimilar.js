import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import RangeSlider from './MealsRange';

export const WantSimilar = ({limits,setLimits,nutritionPref,setNutritionPref,value,setValue}) => {
    
   
      

    return (
      <>
       <TextField  style={{backgroundColor:"white"}} name="limit" onChange={(e)=>setLimits(e.target.value)} className="diet-details-input quantity-box-inner" id="standard-basic" value={limits} label="Quantity " />
                <FormControl className="diet-details-input" component="fieldset">
                <FormLabel component="legend">Nutrition</FormLabel>
                <RadioGroup value={nutritionPref} onChange={(e)=>setNutritionPref(e.target.value)}  aria-label="nutrition"  name="nutritionPref" >
                    <FormControlLabel value="veg" control={<Radio />} label="Vegetarian" />
                    <FormControlLabel value="nonveg" control={<Radio />} label="Non-Vegetarian" />
                    <FormControlLabel value="vegwithegg" control={<Radio />} label="Vegetarian & Egg" />
                </RadioGroup>
                </FormControl>
                <RangeSlider value={value} setValue={setValue}/>
                        
      </>
    )
}


