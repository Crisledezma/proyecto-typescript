import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';



const TextInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      variant='outlined'
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default TextInput