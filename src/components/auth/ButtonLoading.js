import * as React from 'react'
import Box from '@mui/material/Box'

import CircularProgress, {
   circularProgressClasses,
} from '@mui/material/CircularProgress'
import { styled } from '@mui/material'

function Progress(props) {
   return (
      <BoxContainer>
         <StyledCircularProgress
            variant="determinate"
            size={20}
            thickness={4}
            {...props}
            value={100}
         />
         <StyledCircularProgressTwo
            variant="indeterminate"
            disableShrink
            size={20}
            thickness={4}
            {...props}
         />
      </BoxContainer>
   )
}
export default Progress

const BoxContainer = styled(Box)(() => ({
   position: 'relative',
   top: '5px',
}))

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
   color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
}))

const StyledCircularProgressTwo = styled(CircularProgress)(({ theme }) => ({
   color: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
   animationDuration: '550ms',
   position: 'absolute',
   left: 0,
   [`& .${circularProgressClasses.circle}`]: {
      strokeLinecap: 'round',
   },
}))
