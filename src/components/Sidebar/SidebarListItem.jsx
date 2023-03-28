import React, { useEffect } from 'react'

import {
   ExpandLess as ExpandLessIcon,
   ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material'

import { IconButton, ListItemText, styled } from '@mui/material'

import {
   StyledListItem,
   StyledListItemIcon,
   StyledListItemText,
} from './settings'

import CollapseOpen, { StyledItemButton } from './CollapseOpen'

const SidebarListItem = ({
   id,
   text,
   open,
   children,
   subBoards,
   idFromArray,
   openSingeList,
   setIdFromArray,
}) => {
   const toggleIconHandler = (id) => {
      openSingeList(id)
   }

   const setNullFunction = () => {
      setIdFromArray(null)
   }

   useEffect(() => {
      return () => {
         setIdFromArray(null)
      }
   }, [open])

   const renderDirectionIcon = () => {
      return id === idFromArray ? (
         <IconButton onClick={setNullFunction}>
            <ExpandLessIcon />
         </IconButton>
      ) : (
         <IconButton onClick={setNullFunction}>
            <ExpandMoreIcon />
         </IconButton>
      )
   }

   return (
      <>
         <StyledListItem disablePadding>
            <StyledItemButton>
               <StyledListItemIcon open={open}>{children}</StyledListItemIcon>
               <StyledListItemText open={open}>
                  <StyledDiv>
                     <StyledListItemTextPrimary
                        primary={text}
                        onClick={() => toggleIconHandler(id)}
                     />
                     {renderDirectionIcon()}
                  </StyledDiv>
               </StyledListItemText>
            </StyledItemButton>
         </StyledListItem>
         {subBoards.map((item) => {
            return (
               <CollapseOpen
                  {...item}
                  key={item.id}
                  opened={id === idFromArray}
               />
            )
         })}
      </>
   )
}

export default SidebarListItem

const StyledDiv = styled('div')(() => ({
   display: 'flex',
}))

const StyledListItemTextPrimary = styled(ListItemText)(() => ({
   display: 'flex',
   alignItems: 'center',
}))
