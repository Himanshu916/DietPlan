import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import MaterialTable from "material-table"
import axios from "axios"
import Notification from './Notification'


const AllDietTable = () => {
    const navigate = useNavigate()
    const [allDiets,setAllDiets] = useState([]);
    const [file,setFile]=useState(null)
    const [importButton,setImport] = useState(false)
    const [imported,setImported] = useState(false)
    
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

    // const convertToJSON=(header,fileData)=>
    // {
    //     console.log(header,fileData,"ASD")
    // let rowData=[]
    //    fileData.forEach(data=>
    //     {
    //         let row ={};

    //      data.forEach((item,index)=>
    //        {
    //           row[header[index]]=item
    //        })

    //        rowData.push(row)
    //     })

    //     console.log(rowData)
    //     setAllDiets([...allDiets,...rowData])
                  

    // }

    const importExcel=(e)=>
    {
        console.log(e.target.files[0])
        // const file = e.target.files[0]
   
        setFile(e.target.files[0]);
      
    }
    const clickHandler=async(e)=>
    {
        e.preventDefault()
        setImport(false)
        console.log(file)
        let formData = new FormData();
        formData.append("file",file)
       
     
        try{
            
            axios.post('https://keto-diet-kyloapps.herokuapp.com/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            setImported(true)
            setTimeout(()=>
            {
                setImported(false)
            },2000)
     

        }catch(error)
        {
            console.log(error.response)
        }
    }
    useEffect(()=>
    {
        (async()=>
        {
            try
            {
                const {data} = await axios.get("https://keto-diet-kyloapps.herokuapp.com/alldiets");
              
                setAllDiets(data);
            }catch(error)
            {
                console.log(error.response)
            }
        })()
    },[])
    
    const settingData = allDiets.map(item=> {
        const {name,phone,email,tdee,totalFats,totalCarbs,totalProteins,id}=item;
        return {name,phone,email,tdee,totalFats,totalCarbs,totalProteins,id}
     })
    return (
        <div>
        {imported && <Notification message="Successfully Imported"/>}
        <button className="button-import" onClick={()=>setImport(true)}>Want To Import Diet ?</button>
   { importButton && <form className="import" onSubmit={clickHandler} action="">
    <input onChange={importExcel}  type="file" name="" id="" />
    <button type="submit" onClick={clickHandler}>Submit</button>
    </form>}
          
           <MaterialTable actions={[{
               icon:"info",
               tooltip:"view diet",
               onClick:(event,rowData)=>
               {
                
                navigate(`/diet/${rowData.id}`)
                    
               }
           }]} style={{maxWidth:"800px",margin:"0 auto"}} title="Diet Table" data={settingData} columns={columns} 
     
/>
        </div>
    )
}

export default AllDietTable



