import React, { forwardRef } from 'react'
import styled from '@emotion/styled'
import { Radio } from '@mui/material'

const RadioButton = forwardRef(({ checked, onChange, name, ...props }, ref) => {
   return (
      <StyledRadio
         name={name}
         ref={ref}
         checked={checked}
         onChange={onChange}
         {...props}
      />
   )
})

const StyledRadio = styled(Radio)(() => ({
   width: '20.8px',
   height: '20.8px',
}))

export default RadioButton
