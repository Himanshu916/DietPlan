import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import MaterialTable from "material-table"
import axios from "axios"

const AllDietTable = () => {
    const navigate = useNavigate()
    const [allDiets,setAllDiets] = useState([]);
    const columns = [
        {
            title:"Name",field:"name"
        },
        {
            title:"Phone",field:"phone"
        },
        {
            title:"Email",field:"email"
        },
        {
            title:"T.Calories",field:"tdee"
        },
        {
            title:"T.Fats",field:"totalFats"
        },
        {
            title:"T.Carbs",field:"totalCarbs"
        },
        {
            title:"T.Proteins",field:"totalProteins"
        }
    ]
    useEffect(()=>
    {
        (async()=>
        {
            try
            {
                const {data} = await axios.get("https://keto-diet-kyloapps.herokuapp.com/alldiets");
                const settingData = data.map(item=> {
                   const {name,phone,email,tdee,totalFats,totalCarbs,totalProteins,id}=item;
                   return {name,phone,email,tdee,totalFats,totalCarbs,totalProteins,id}
                })
               console.log(data)
                setAllDiets(settingData);
            }catch(error)
            {
                console.log(error.response)
            }
        })()
    },[])
    console.log(allDiets)
    return (
        <div>
           <MaterialTable actions={[{
               icon:"info",
               tooltip:"view diet",
               onClick:(event,rowData)=>
               {
                //    console.log(rowData)
                navigate(`/diet/${rowData.id}`)
                    
               }
           }]} style={{maxWidth:"800px",margin:"0 auto"}} title="Diet Table" data={allDiets} columns={columns} />
        </div>
    )
}

export default AllDietTable