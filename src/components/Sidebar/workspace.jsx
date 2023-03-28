import React from 'react'

import { List as ListIcon } from '@mui/icons-material'

import {
   StyledListItem,
   StyledListItemIcon,
   StyledListItemText,
   StyledListItemButton,
} from './settings'

const Workspace = ({ open }) => {
   return (
      <StyledListItem disablePadding>
         <StyledListItemButton>
            <StyledListItemIcon open={open}>
               <ListIcon />
            </StyledListItemIcon>
            <StyledListItemText primary="Workspaces" open={open} />
         </StyledListItemButton>
      </StyledListItem>
   )
}

export default Workspace
