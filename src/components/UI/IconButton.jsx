import React from 'react'
import { styled, IconButton as MuiIconButton } from '@mui/material'

const IconButton = ({ icon, onClick, disabled, ...props }) => {
   return (
      <StyledIconButton onClick={onClick} disabled={disabled} {...props}>
         {icon}
      </StyledIconButton>
   )
}

const StyledIconButton = styled(MuiIconButton)(() => ({
   background: 'none',
}))

export default IconButton
