import React,{useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
// import { TextareaAutosize } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios"
import {useState} from "react";
import {Link} from "react-router-dom"
import Notification from './Notification';
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
    const [details,setDetails]=useState(initialState)
    const [notif,setNotif] = useState({boolean:false,message:""})
    useEffect(()=>
    {
        if(id)
        {
            (async()=>
            {
        
                try
                {
                    const {data} = await axios.get("https://keto-diet-kyloapps.herokuapp.com/diet/"+id)
                    setDetails(data[0])
                }catch(error)
                {
                    console.log(error.response)
                }
            })()
        }
       
       
        

    },[id])
    const changeHandler =(e)=>
    {
        
        const {name,value} = e.target;
        setDetails({...details,[name]:value})
    }
    const submitHandler=async(e,details)=>
    {
        e.preventDefault();
        if(from==="update")
        {
            console.log(from)
            try{
                const {data} = await axios.put("https://keto-diet-kyloapps.herokuapp.com/diet",{...details,id})
                console.log(data)
                setNotif({...notif,boolean:true,message:"Successfully Updated"})
                
            }catch(error)
            {
                console.log(error.response)
            }
        }
        else{

        try{
            console.log(details,"yha kya h")
            const {data} = await axios.post("https://keto-diet-kyloapps.herokuapp.com/diet",details)
            console.log(data,"created data")
           setNotif({...notif,boolean:true,message:"Successfully Created"})
        }catch(error)
        {
            console.log(error.response)
        }
    }

    }

    
    return (
        <div className="diet">
            <form onSubmit={(e)=>submitHandler(e,details)} className="diet-details" noValidate autoComplete="off">
                <TextField name="name" onChange={changeHandler} className="diet-details-input" id="standard-basic" value={details.name} label="Name" />
                <TextField name="email" onChange={changeHandler}  className="diet-details-input" id="standard-basic" value={details.email} label="Email" type="email" />
                <TextField name="phone" onChange={changeHandler}  className="diet-details-input" value={details.phone}
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                    <FormControl className="diet-details-input" component="fieldset" >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup  onChange={changeHandler}  aria-label="gender" value={details.gender} name="gender" >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                </FormControl>
                <TextField name="weight" onChange={changeHandler}  className="diet-details-input" id="standard-basic" label="Weight" type="number" value={details.weight}/>
                <TextField name="height" onChange={changeHandler}  className="diet-details-input" id="standard-basic" label="Height" type="number" value={details.height} />
                <TextField name="age" onChange={changeHandler}  className="diet-details-input" id="standard-basic" label="Age" type="number" value={details.age} />
                <FormControl className="diet-details-input" component="fieldset" >
                <FormLabel component="legend">Life Style</FormLabel>
                <RadioGroup  onChange={changeHandler}  aria-label="lifestyle" value={details.lifestyle} name="lifestyle" >
                    <FormControlLabel value="seden" control={<Radio />} label="Sedentary" />
                    <FormControlLabel value="lowActive" control={<Radio />} label="Active" />
                    <FormControlLabel value="Active" control={<Radio />} label=" Low Active" />
                    <FormControlLabel value="veryActive" control={<Radio />} label="Very Active" />
                </RadioGroup>
                </FormControl>
                <FormControl className="diet-details-input" component="fieldset">
                <FormLabel component="legend">Nutrition</FormLabel>
                <RadioGroup  onChange={changeHandler}  aria-label="nutrition" value={details.nutritionPref} name="nutritionPref" >
                    <FormControlLabel value="veg" control={<Radio />} label="vegetarian" />
                    <FormControlLabel value="non-veg" control={<Radio />} label="Non-Vegetarian" />
                </RadioGroup>
                </FormControl>
                <TextField name="carbs" onChange={changeHandler}  className="diet-details-input" id="standard-basic" label="Carbohydrates" value={details.carbs} type="number" />
                <TextField name="proteins" onChange={changeHandler}  className="diet-details-input" value={details.proteins} id="standard-basic" label="Protein" type="number" />
                <TextField name="numberOfMeals" onChange={changeHandler}  className="diet-details-input" value={details.numberOfMeals} id="standard-basic" label="No. of Meals" type="number" />
                <TextField name="numberOfSnacks" onChange={changeHandler}  className="diet-details-input" id="standard-basic" label="No. of Snacks" value={details.numberOfSnacks} type="number" />
                <TextField name="caloriesPerSnack" onChange={changeHandler}  className="diet-details-input" value={details.caloriesPerSnack} id="standard-basic" label="Calorie/snack" type="number" />
                <TextField name="deficitPercentage" onChange={changeHandler}  className="diet-details-input" value={details.deficitPercentage} id="standard-basic" label="Deficit percentage" type="number" />
                <div className="buttons">
                    <button className="button buttons-creatediet" onSubmit={(e)=>submitHandler(e,details)}> {from ==="update" ? "Update Plan" : "Create Plan"} </button>
                    <Link className="button" style={{textDecoration:"none",textAlign:"center"}} to="/alldiets">
                   All Diet Plans
                    </Link>
                    
                </div>
            </form>
            {notif.boolean && <Notification message={notif.message}/>}
        </div>
    )
}
export default InputData