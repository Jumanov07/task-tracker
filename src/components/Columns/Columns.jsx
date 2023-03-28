import React from 'react'
import { useParams } from 'react-router-dom'

import { styled } from '@mui/material'
import InnerPageColumn from './InnerPage-Column'
import { useGetInnerPageIdQuery } from '../../redux/api/inner-page-board-api'
import RenderColumns from './RenderColumns'
import Card from '../Card/Card'

const Columns = () => {
   const { boardId } = useParams()
   const { data } = useGetInnerPageIdQuery(boardId)

   const { background, name, favourite, id } = data || {}
   return (
      <>
         <BoardInnerPageColumnW background={background} />
         <BoardInnerPageColumnWrapper>
            <InnerPageColumn
               name={name}
               favourite={favourite}
               id={id}
               background={background}
            />
            <RenderColumns />
            <Card />
         </BoardInnerPageColumnWrapper>
      </>
   )
}
const BoardInnerPageColumnWrapper = styled('div')(() => ({
   width: '91vw',
   minHeight: '90vh',
}))

const BoardInnerPageColumnW = styled('img')(({ background }) => ({
   width: '100vw',
   zIndex: '-3',
   position: 'absolute',
   minHeight: '90vh',
   backgroundSize: 'cover',
   backgroundPosition: 'cover',
   backgroundRepeat: 'no-repeat',
   backgroundImage: `url(${background})`,
}))

export default Columns
