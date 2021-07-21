import React,{useState} from 'react'
import {Table} from "@material-ui/core"
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

export default function useTable(records,headCells,filter){

    const pages = [10,20,30]
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
const TblContainer =(props)=>
{
    return <Table>
        {props.children}
    </Table>
}


const TblHead = props=>
{
    return (
        <TableHead>
            <TableRow>
                    {
                        headCells.map(headCell=>(
                            <TableCell key={headCell.id}>
                           
                            {headCell.label}
                           
                             
                            </TableCell>
                        ))
                    }
            </TableRow>
        </TableHead>
    )
}
const handleChangePage=(event,newPage)=>
{
    setPage(newPage)
}
const handleChangeRowsPerPage=(event)=>
{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
}

const TblPagination=()=>
(
<TablePagination 
component="div"
page={page}
rowsPerPageOptions={pages}
rowsPerPage={rowsPerPage}
count ={records.length}
onChangePage={handleChangePage}
onChangeRowsPerPage={handleChangeRowsPerPage}

 />

)

const recordsAfterPagingAndSorting=()=>
{
    return filter.fn(records).slice(page*rowsPerPage,(page+1)*rowsPerPage)
}
    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}
