import React, { forwardRef } from 'react'
import { Checkbox, styled } from '@mui/material'

const CheckBox = forwardRef(({ checked, onChange, ...props }, ref) => {
   return (
      <StyledCheckbox
         ref={ref}
         checked={checked}
         onChange={onChange}
         {...props}
      />
   )
})

const StyledCheckbox = styled(Checkbox)(() => ({
   width: '17px',
   height: '17px',
}))

export default CheckBox
