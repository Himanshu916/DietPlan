import React,{useEffect} from 'react'
import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios"
import {useState} from "react";
import {useNavigate} from "react-router-dom"
import Notification from './Notification';
import DietCard from './DietCard';
import SimilarDiets from './SimilarDiets';
import {Formik,Field,Form,ErrorMessage} from "formik";
import { validationSchema } from '../utils/validate';

 const InputData = ({from,id}) => {
    const initialState = {
        name:"",
        email:"",
        phone:0,
        gender:"",
        weight:"",
        height:"",
        age:"",
        lifestyle: "",
        nutritionPref: "",
        carbs: 0,
        proteins: 0,
        numberOfMeals: 0,
        numberOfSnacks: 0,
        caloriesPerSnack: 0,
        deficitPercentage:0
    }
    const [initialValues,setInitialState]=useState(initialState)
    const [notif,setNotif] = useState({boolean:false,message:""})
    const [created,setCreated] = useState({boolean:false,id:id,diet:{}})
    const navigate = useNavigate();

    const getData=async (id)=>
    {
        try
        {
            return await axios.get("https://keto-diet-kyloapps.herokuapp.com/diet/"+id)

        }catch(error)
        {
            console.log(error.response)
        }
        
    }
    useEffect(()=>
    {
      
        if(created.id)
        {  
         (async()=>
            {
                try
                {
                   const {data} = await getData(created.id)
                   console.log(data)
                    setInitialState(data[0])
               
                }catch(error)
                {
                    console.log(error.response)
                }
            })()
        }
       
       
        

    },[created.id])

  

    const submitHandler=async(values,props)=>
    {
        if(from==="update")
        {
            
            try{
                await axios.put("https://keto-diet-kyloapps.herokuapp.com/diet",{...values,id})
               
                setNotif({...notif,boolean:true,message:"Successfully Updated"})
                setTimeout(function(){  navigate(`/diet/${id}`) }, 1000);
                props.resetForm();
                props.setSubmitting(false)
               
            }catch(error)
            {
                console.log(error.response)
            }
            
        }
        else{

        try{
            const {data} = await axios.post("https://keto-diet-kyloapps.herokuapp.com/diet",values)
            const response = await getData(data.id)
            console.log(data,"created data",response)
           setNotif({...notif,boolean:true,message:"Successfully Created"})
           setCreated({...created,boolean:true,id:data.id,diet:response.data[0]});
           props.resetForm();
           props.setSubmitting(false)
        window.location.hash = 'dietCard';
        }catch(error)
        {
            console.log(error.response)
        }

    }

    }
console.log(initialValues)
    return (
        <>
        <div className="diet">
            <Formik onSubmit={submitHandler} enableReinitialize initialValues={initialValues} validationSchema={validationSchema} >
                {(props)=>{
                   
                    return (
                    <Form className="diet-details">
                    
                <Field as={TextField}   name="name"  className="diet-details-input" id="standard-basic" label="Name" helperText={<ErrorMessage name="name"/>}  />
                <Field as={TextField}  name="email"  className="diet-details-input" id="standard-basic"  label="Email" type="email" helperText={<ErrorMessage name="email"/>} />
                <Field as={TextField} name="phone"   className="diet-details-input" 
                    id="standard-number"
                    label="Phone Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={<ErrorMessage name="phone"/>}
                    />
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
                </Field>
                <FormHelperText><ErrorMessage name="lifestyle"/></FormHelperText>
                </FormControl>
                <FormControl className="diet-details-input" component="fieldset">
                <FormLabel component="legend">Nutrition</FormLabel>
                <Field  as={RadioGroup}  aria-label="nutrition"  name="nutritionPref" >
                    <FormControlLabel value="veg" control={<Radio />} label="Vegetarian" />
                    <FormControlLabel value="nonveg" control={<Radio />} label="Non-Vegetarian" />
                    <FormControlLabel value="vegwithegg" control={<Radio />} label="Vegetarian & Egg" />
                </Field>
                <FormHelperText><ErrorMessage name="nutritionPref"/></FormHelperText>
                </FormControl>
                <Field as={TextField} name="carbs"  className="diet-details-input" id="standard-basic" label="Carbohydrates"  type="number" helperText={<ErrorMessage name="carbs"/>}  />
                <Field as={TextField} name="proteins"  className="diet-details-input"  id="standard-basic" label="Protein" type="number" helperText={<ErrorMessage name="proteins"/>}  />
                <Field as={TextField} name="numberOfMeals"  className="diet-details-input"  id="standard-basic" label="No. of Meals" type="number" helperText={<ErrorMessage name="numberOfMeals"/>}  />
                <Field as={TextField} name="numberOfSnacks"  className="diet-details-input" id="standard-basic" label="No. of Snacks"  type="number" helperText={<ErrorMessage name="numberOfSnacks"/>}  />
                <Field as={TextField} name="caloriesPerSnack"   className="diet-details-input"  id="standard-basic" label="Calorie/snack" type="number" helperText={<ErrorMessage name="caloriesPerSnack"/>}  />
                <Field as={TextField} name="deficitPercentage"   className="diet-details-input"  id="standard-basic" label="Deficit percentage" type="number" helperText={<ErrorMessage name="deficitPercentage"/>}  />
                <div className="buttons">
                    <button type="submit" disabled={props.isSubmitting} className="button buttons-creatediet" onSubmit={submitHandler}> {from ==="update" ? props.isSubmitting ?"Loading": "Update Plan" :props.isSubmitting ?"Loading":"Create Plan"} </button>
                </div>
                    </Form>
                )}}
            </Formik>
            {notif.boolean && <Notification message={notif.message}/>}
        </div>
       
        {
            created.boolean && <>
            
                <h1 id="dietCard" className="heading"> Diet Created </h1>
                <div className="diets diets--created">
                    <DietCard key={created.id} diet={created.diet} />
                </div>
                <SimilarDiets from="create" quantity={4} diet={created.diet}/>
            </>

        }
    
        </>
    )
}
export default InputData

