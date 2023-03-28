import { FormControl, InputBase, styled } from '@mui/material'
import React from 'react'
import Button from '../UI/Button'

const Form = ({ value, onChange, onClick, buttonTitle }) => {
   return (
      <StyledFormControl>
         <StyledInput
            autoFocus={!false}
            maxLength="20"
            variant="outlined"
            value={value}
            onChange={onChange}
         />
         <Button sx={{ alignSelf: 'end' }} onClick={onClick}>
            {buttonTitle}
         </Button>
      </StyledFormControl>
   )
}

export default Form

const StyledFormControl = styled(FormControl)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '5px',
}))

const StyledInput = styled(InputBase)(() => ({
   backgroundColor: '#F4F4F4',
   borderRadius: '8px',
   padding: '0px 10px',
}))
