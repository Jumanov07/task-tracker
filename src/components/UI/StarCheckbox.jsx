import React, { forwardRef } from 'react'
import { Checkbox, styled } from '@mui/material'
import { FilledStar, StarOutLine } from '../../assets/icons'

const StarCheckbox = forwardRef(({ checked, onChange, ...props }, ref) => {
   return (
      <StyledCheckbox
         ref={ref}
         checked={checked}
         onChange={onChange}
         icon={<StyledIcon />}
         checkedIcon={<FilledStar />}
         {...props}
      />
   )
})

export default StarCheckbox
const StyledCheckbox = styled(Checkbox)(() => ({
   width: '34px',
   height: '34px',
}))

const StyledIcon = styled(StarOutLine)(() => ({
   boxShadow: 'none',
   ':hover': {
      boxShadow: 'none',
      background: 'none',
      outline: 'none',
   },
}))
