import React from 'react'

import { Collapse, List, styled } from '@mui/material'

import {
   Add as AddIcon,
   Settings as SettingsIcon,
   PeopleAlt as PeopleAltIcon,
   AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
} from '@mui/icons-material'

import { StyledListItemButton } from './settings'

const CollapseOpen = ({ opened }) => {
   return (
      <Collapse in={opened} timeout="auto">
         <StyledList>
            <span>
               <StyledItemButton>
                  <AutoAwesomeMosaicIcon />
                  <StyledTitle>Boards</StyledTitle>
               </StyledItemButton>
               <StyledItemButton>
                  <PeopleAltIcon />
                  <StyledTitle>Participants</StyledTitle>
                  <AddIcon />
               </StyledItemButton>
               <StyledItemButton>
                  <SettingsIcon />
                  <StyledTitle> Setting</StyledTitle>
               </StyledItemButton>
            </span>
         </StyledList>
      </Collapse>
   )
}

export default CollapseOpen

export const StyledItemButton = styled(StyledListItemButton)(() => ({
   padding: '4px 0px 4px 23px',
   display: 'flex',
   '& svg': {
      color: '#919191',
   },
}))

const StyledList = styled(List)(() => ({
   width: '200px',
   fontSize: '14px',
   display: 'flex',
   flexDirection: 'column',
   padding: '0',
   alignItems: 'center',
   '& .MuiList-root': {
      padding: 0,
   },
}))

const StyledTitle = styled('span')(() => ({
   display: 'flex',
   color: '#919191',
   marginLeft: '7px',
   marginRight: '4px',
   alignItems: 'center',
}))
