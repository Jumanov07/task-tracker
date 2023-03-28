import { styled } from '@mui/material'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHandleFavoriteMutation } from '../../redux/api/all-boards-api'

import StarCheckbox from '../UI/StarCheckbox'

const Cardboards = ({ boardid, id, name, background, favourite }) => {
   const [handleFavourite] = useHandleFavoriteMutation()

   const navigate = useNavigate()

   const toggleFavoriteHandler = useCallback(() => {
      handleFavourite(id)
   }, [id])

   const navigateToColumn = (e) => {
      if (e.target.type !== 'checkbox') {
         navigate(`/boards/${boardid}/${id}`)
      }
   }

   return (
      <CardBoard
         data-aos="flip-right"
         background={background}
         onClick={navigateToColumn}
      >
         <p>{name}</p>
         <StyledStar>
            <StyledStarCheckbox
               checked={favourite}
               onClick={toggleFavoriteHandler}
            />
         </StyledStar>
      </CardBoard>
   )
}

export default Cardboards
const CardBoard = styled('div')(({ background }) => ({
   height: '122px',
   borderRadius: '8px',
   backgroundImage: `url(${background})`,
   backgroundSize: 'cover',
   backgroundPosition: '50% 50%',
   padding: ' 16px 2px 2px 16px',
   display: 'flex',
   justifyContent: 'space-between',
   flexDirection: 'column',
   color: 'white',
}))
const StyledStar = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
}))
const StyledStarCheckbox = styled(StarCheckbox)(() => ({
   background: 'none',
}))
