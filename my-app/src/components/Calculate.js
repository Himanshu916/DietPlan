import React from 'react'
import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios"
import {useState} from "react";
import Notification from './Notification';

import {Formik,Field,Form,ErrorMessage} from "formik";
// import { validationSchema } from '../utils/validate';

 const Calculate = () => {
    const initialState = {
        gender:"",
        weight:"",
        height:"",
        age:"",
        lifestyle: "",
        carbs: "",
        proteins: "",
        deficitPercentage:""
    }
    const [initialValues,setInitialState]=useState(initialState)
    const [notif,setNotif] = useState({boolean:false,message:""})
    const [created,setCreated] = useState({boolean:false,diet:{}})

    const submitHandler=async(values,props)=>
    {
        console.log(values,"kya hua")
        try{
            const {data} = await axios.post("https://keto-diet-kyloapps.herokuapp.com/calculate",values)
    
            console.log(data,"calculated data")
           setNotif({...notif,boolean:true,message:"Successfully Calculated"})
           setCreated({...created,boolean:true,diet:data});
           setInitialState({
            gender:"",
            weight:"",
            height:"",
            age:"",
            lifestyle: "",
            carbs: "",
            proteins: "",
            deficitPercentage:""
        })
           props.resetForm();
           props.setSubmitting(false)
        window.location.hash = 'dietCard';
        }catch(error)
        {
            console.log(error.response)
        }

    }
    return (
        <>
        <div className="diet">
        <h1 className="heading"> Calculate Diet Plan </h1>
        <Formik onSubmit={submitHandler} enableReinitialize initialValues={initialValues}  >
            {(props)=>{
               
                return (
                <Form className="diet-details">
                
            
           
            
                <FormControl className="diet-details-input" component="fieldset" >
            <FormLabel component="legend">Gender</FormLabel>
            <Field as ={RadioGroup}    aria-label="gender"  name="gender" >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </Field>
            <FormHelperText><ErrorMessage name="gender"/></FormHelperText>
            </FormControl>
            
            <div className="checks">
            <Field as={TextField} name="weight"   className="diet-details-input" id="standard-basic" label="Weight" type="number"  style={{width:"100%"}} helperText={<ErrorMessage name="weight"/>}   />
            <span>Kg</span>
            </div>
            <div className="checks">
            <Field as={TextField} name="height"  className="diet-details-input" id="standard-basic" label="Height" type="number" style={{width:"100%"}} helperText={<ErrorMessage name="height"/>}   />
            <span>Mts</span>
            </div>
            <div className="checks">
            <Field as={TextField} name="age"  className="diet-details-input" id="standard-basic" label="Age" type="number"  style={{width:"100%"}} helperText={<ErrorMessage name="age"/>}   />
            <span>Yrs</span>
            </div>
            <FormControl className="diet-details-input" component="fieldset" >
            <FormLabel component="legend">Life Style</FormLabel>
            <Field  as={RadioGroup}  aria-label="lifestyle"  name="lifestyle" >
                <FormControlLabel value="seden" control={<Radio />} label="Sedentary" />
                <FormControlLabel value="lowActive" control={<Radio />} label="Active" />
                <FormControlLabel value="Active" control={<Radio />} label=" Low Active" />
                <FormControlLabel value="veryActive" control={<Radio />} label="Very Active" />
                <FormControlLabel value="extremelyActive" control={<Radio />} label="Extremely Active" />
            </Field>
            <FormHelperText><ErrorMessage name="lifestyle"/></FormHelperText>
            </FormControl>
           
        
            <Field as={TextField} name="carbs" placeholder="Please enter g of carbohydrates you'd like to consume."  className="diet-details-input" id="standard-basic" label="Carbohydrates"  type="number" helperText={<ErrorMessage name="carbs"/>}  />
            <Field as={TextField} placeholder="Please enter multiplying factor for protein." name="proteins"  className="diet-details-input"  id="standard-basic" label="Protein" type="number" helperText={<ErrorMessage name="proteins"/>}  />
          
           
           
            <Field as={TextField} name="deficitPercentage"   className="diet-details-input"  id="standard-basic" label="Deficit percentage" type="number" helperText={<ErrorMessage name="deficitPercentage"/>}  />
            <div className="buttons">
                <button type="submit" disabled={props.isSubmitting}  className="button buttons-creatediet" onSubmit={submitHandler}> {props.isSubmitting ?"Loading":"Calculate Diet"} </button>
            </div>
                </Form>
            )}}
        </Formik>
        {notif.boolean && <Notification message={notif.message}/>}
    </div>
     {
        created.boolean && <>
        
            <h1 id="dietCard" className="heading"> Diet Calculated </h1>
            <div className="diets diets--created">
            <div id="dietCard" className="dietCard">
            <h2>Required Diet</h2>
        <ul>
            <li>
                  <h2>Total Calories</h2>
                  <h4>{created.diet.totalCalories.toFixed(2)} Calories</h4>
              </li>
              <li>
                  <h2>Protein per day</h2>
                  <h4>{(created.diet.totalProteins)/4} Grams</h4>
              </li>
              <li>
                  <h2>Carbohydrate per day</h2>
                  <h4>{(created.diet.totalCarbs/4)} Grams</h4>
              </li>
              <li>
                  <h2>Fat per day</h2>
                  <h4>{created.diet.totalFats.toFixed(2)} Grams</h4>
              </li>
              <li>
                <h2>Diet Calories</h2>
                  <h4>{created.diet.remainingDeficit} Calories</h4>
              </li>
            </ul> 
            </div>
            </div>
        </>

    }
  </>
    )
}

export default Calculate;