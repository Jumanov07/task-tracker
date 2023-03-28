import { styled } from '@mui/material'
import React from 'react'
import { ImgBackground, ImgWrapper, StyledCheckMark } from './Photo'

const Color = ({ image, id, takeId, colorId, bottom }) => {
   return (
      <ImgWrapper className="imgColor">
         <ImgBackground
            src={image}
            alt="colorImg"
            key={id}
            onClick={() => takeId(id)}
         />
         {colorId === id && (
            <StyledDiv bottom={bottom}>
               <StyledCheckMark className="color" />
            </StyledDiv>
         )}
      </ImgWrapper>
   )
}
const StyledDiv = styled(StyledCheckMark)(() => ({
   display: 'flex',
   margin: '-24% auto',
   position: 'relative',
   bottom: '8px',
}))

export default Color
