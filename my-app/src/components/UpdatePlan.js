import React from 'react'
import InputData from './InputData'
import { useParams } from 'react-router-dom'
 const UpdatePlan = () => {
     const {id} = useParams();
    return (
        <>
        <h1 className="heading"> Update Diet Plan </h1>
    <InputData id={id} from="update"/>
    </>)
}

export default UpdatePlan