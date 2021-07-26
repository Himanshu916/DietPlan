import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import TableBody from '@material-ui/core/TableBody';
import axios from "axios"
import Notification from './Notification'
import useTable from './NewTable'
import { Paper,makeStyles, InputAdornment } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Icon from '@material-ui/core/Icon';
import Input from "../components/Input"
import { Toolbar } from '@material-ui/core';



const useStyles = makeStyles((theme)=>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput:{
        width:'75%'
    }
}))

const headCells = [
    {
        label:"View",id:"info"
    },
        {
            label:"Name",id:"name"
        },
        {
            label:"Phone",id:"phone"
        },
        {
            label:"Email",id:"email"
        },
        {
            label:"T.Calories",id:"tdee"
        },
        {
            label:"T.Fats",id:"totalFats"
        },
        {
            label:"T.Carbs",id:"totalCarbs"
        },
        {
            label:"T.Proteins",id:"totalProteins"
        }

    
]
const AllDietTable = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const [allDiets,setAllDiets] = useState([]);
    const [filter,setFilter] = useState({fn:items=>{return items;}});
    const [file,setFile]=useState(null)
    const [importButton,setImport] = useState(false)
    const [imported,setImported] = useState(false)
    const {TblContainer,TblHead,TblPagination,recordsAfterPagingAndSorting} = useTable(allDiets,headCells,filter);
    
   

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
    const handleSearch =({target})=>
    {
        setFilter({
            fn:items=>{
                if(target.value == "")
                return items
                else
                {
                    return items.filter(item=>{
                        
                        return (item.name.toLowerCase()).includes(target.value.toLowerCase()) ||(item.email.toLowerCase()).includes(target.value.toLowerCase())   } )
                }
            }
        })

    }
 
    return (
        <div>
        {imported && <Notification message="Successfully Imported"/>}
        <button className="button-import" onClick={()=>setImport(true)}>Want To Import Diet ?</button>
   { importButton && <form className="import" onSubmit={clickHandler} action="">
    <input onChange={importExcel}  type="file" name="" id="" />
    <button type="submit" onClick={clickHandler}>Submit</button>
    </form>}
          
          
<Paper style={{maxWidth:"960px",margin:"0 auto",overflow:"auto"}} className={classes.pageContent}>
<Toolbar>
    <Input className={classes.searchInput}
        label="Search Diet"
        InputProps={{
            startAdornment:(<InputAdornment>
                <Icon>Search</Icon>
            </InputAdornment>)
        
        }}
        onChange={handleSearch}
    />
</Toolbar>
<TblContainer>
    <TblHead/>
    <TableBody>
        {
            recordsAfterPagingAndSorting().map(item=>(
                <TableRow key={item.id}>
                    <TableCell > <Icon style={{cursor:"pointer"}} onClick={(event)=>
               {
                
                navigate(`/diet/${item.id}`)
                    
               }}>info</Icon>  </TableCell>
                    <TableCell> {item.name} </TableCell>
                    <TableCell> {item.phone} </TableCell>
                    <TableCell> {item.email} </TableCell>
                    <TableCell> {item.tdee} </TableCell>
                    <TableCell> {item.totalFats} </TableCell>
                    <TableCell> {item.totalCarbs/4} </TableCell>
                    <TableCell> {item.totalProteins} </TableCell>
                </TableRow>
            ))
        }

    </TableBody>

</TblContainer>
<TblPagination/>
</Paper>
        </div>
    )
}

export default AllDietTable



