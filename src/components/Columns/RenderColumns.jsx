import { styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ColumnItem from './ColumnItem'

const RenderColumns = () => {
   const { columnWidth } = useSelector((state) => state.changeWidthColumns)
   return (
      <StyledDiv columnWidth={columnWidth}>
         <ColumnItem />
      </StyledDiv>
   )
}

export default RenderColumns
const StyledDiv = styled('div')(({ columnWidth }) => ({
   width: '100%',
   height: '83%',
   transitionDuration: '.3.6s',
   maxWidth: columnWidth ? '80vw' : '90vw',
   overflowX: 'auto',
   '::-webkit-scrollbar': {
      height: '15px',
   },
   '::-webkit-scrollbar-track': {
      borderRadius: '8px',
      background: '#e2e2e253',
   },
   '::-webkit-scrollbar-thumb': {
      background: ' rgba(134, 166, 218, 0.625)',
      borderRadius: '8px',
   },
   '::-webkit-scrollbar-button': {
      height: '4px',
   },
   '::-webkit-scrollbartrack': { with: '90%', height: '10px' },
}))
