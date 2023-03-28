import { styled } from '@mui/material'
import React from 'react'

const ProgressBar = ({ percent, counts }) => {
   return (
      <BlockProggresBar>
         <span>{counts}</span>
         <BoxProgressBar>
            <Progress widthProgress={percent}> </Progress>
         </BoxProgressBar>
         <span>{percent}%</span>
      </BlockProggresBar>
   )
}

export default ProgressBar
const BlockProggresBar = styled('div')(() => ({
   width: '99%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingTop: '10px',
}))
const BoxProgressBar = styled('div')(() => ({
   width: '585px',
   height: '10px',
   padding: '2px',
   backgroundColor: '#f0f0f0',
   borderRadius: '8px',
}))
const Progress = styled('div')(({ widthProgress }) => ({
   width: `${widthProgress || 0}%`,
   height: '6px',
   backgroundColor: '#0079bf',
   borderRadius: '8px',
   transition: 'width 0.5s ease-in-out',
}))
