import React from 'react'
import { TextField } from '@material-ui/core'

 const Input = ({name,label,value,error=null,onChange,...other}) => {
    return (
        <TextField
            placeholder="Search by name or email"
            variant="outlined"
            label={label}
            value={value}
            name={name}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error}) }


        />
    )
}

export default Input