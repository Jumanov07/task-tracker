import React from 'react'
import { styled } from '@mui/material'
import { CheckMark } from '../../../assets/icons'

const Photo = ({ image, id, addHandler, checkMarkIconId }) => {
   return (
      <ImgWrapper className="imgPhoto">
         <ImgBackground
            src={image}
            alt="imgPhoto"
            key={id}
            onClick={() => addHandler(id)}
         />
         {checkMarkIconId === id && <StyledCheckMark />}
      </ImgWrapper>
   )
}

export default Photo

export const ImgWrapper = styled('div')(() => ({
   width: '160px',
   height: '80px',
}))

export const ImgBackground = styled('img')(() => ({
   width: '100%',
   height: '100%',
   borderRadius: '8px',
   display: 'flex',
}))

export const StyledCheckMark = styled(CheckMark)(() => ({
   display: 'flex',
   margin: '-30% auto',
}))
