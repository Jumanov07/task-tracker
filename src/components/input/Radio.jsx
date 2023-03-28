import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material'

const RadioButton = ({ setRadiovalue }) => {
   return (
      <FormControl>
         <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
         >
            <StyledMember
               value="male"
               control={<Radio onClick={() => setRadiovalue('USER')} />}
               label="Member"
            />
            <FormControlLabel
               value="other"
               control={<Radio onClick={() => setRadiovalue('ADMIN')} />}
               label="Admin"
            />
         </RadioGroup>
      </FormControl>
   )
}

const StyledMember = styled(FormControlLabel)(() => ({
   marginLeft: '5px',
}))
export default RadioButton
