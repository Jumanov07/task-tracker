import * as React from 'react'

import { styled } from '@mui/material'

import { useParams } from 'react-router'
import { DYMMY_IMAGES } from '.'
import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'

import ModalWrapper from './ModalWrapper'
import Photo from './Photo'
import { useInnerPageBackgroundMutation } from '../../../redux/api/inner-page-board-api'

const Photos = () => {
   const { isActive } = useToggleMenu()
   const { boardId } = useParams()

   const { setIsActiveMenu, onCloseMenu } = useToggleMenu()
   const [innerPageBackground] = useInnerPageBackgroundMutation()

   const addHandler = (id) => {
      const newImages = DYMMY_IMAGES.find((item) => item.id === id)

      const newData = {
         boardId,
         value: newImages.image,
         background: true,
      }
      innerPageBackground(newData)
      setIsActiveMenu({})
   }

   return (
      <ModalWrapper
         isOpen={isActive === 'photos'}
         onCloseMenu={() => onCloseMenu()}
      >
         <ForAllWrapper>
            {DYMMY_IMAGES.map((item) => (
               <Photo key={item.id} {...item} addHandler={addHandler} />
            ))}
         </ForAllWrapper>
      </ModalWrapper>
   )
}
export default Photos

export const ForAllWrapper = styled('div')(() => ({
   width: '340px',
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)',
   columnGap: '8px',
   rowGap: '8px',
   padding: '10px 0px 16px 20px',
}))
