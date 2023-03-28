import React, { useCallback } from 'react'

import {
   ExpandLess,
   ExpandMore,
   AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
} from '@mui/icons-material'

import { ListItemIcon, styled } from '@mui/material'

import {
   StyledListItem,
   StyledListItemText,
   StyledListItemIcon,
   StyledListItemButton,
} from './settings'

const Boards = ({ open, isOpen, children, handleOpen }) => {
   const renderIcon = useCallback(() => {
      return isOpen ? (
         <StyledDirectionIcon onClick={handleOpen}>
            <ExpandLess />
         </StyledDirectionIcon>
      ) : (
         <StyledDirectionIcon onClick={handleOpen}>
            <ExpandMore />
         </StyledDirectionIcon>
      )
   }, [isOpen])

   return (
      <>
         <StyledListItemColor disablePadding open={open}>
            <StyledBoardsButton open={open}>
               <StyledListItemIconDirection>
                  <AutoAwesomeMosaicIcon />
               </StyledListItemIconDirection>
               <StyledListItemText primary="Boards" open={open} />
               <div>{renderIcon()}</div>
            </StyledBoardsButton>
         </StyledListItemColor>
         {children}
      </>
   )
}

export default Boards

export const StyledDirectionIcon = styled(ListItemIcon)(() => ({
   display: 'flex',
   justifyContent: 'center',
   color: '#fff',
}))

const StyledListItemIconDirection = styled(StyledListItemIcon)(() => ({
   color: '#fff',
   marginRight: '19px',
}))

const StyledListItemColor = styled(StyledListItem)(() => ({
   color: '#fff',
}))
const StyledBoardsButton = styled(StyledListItemButton)(() => ({
   backgroundColor: 'rgba(58, 104, 131, 0.6)',
   justifyContent: 'initial',
   '&:hover': {
      backgroundColor: 'rgba(58, 104, 131, 0.6)',
   },
}))
