import { useParams } from 'react-router'

import { styled } from '@mui/material'

import { DYMMY_COLORS } from '.'
import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'
import { useInnerPageBackgroundMutation } from '../../../redux/api/inner-page-board-api'

import Color from './Color'
import ModalWrapper from './ModalWrapper'

const Colors = () => {
   const { isActive, setIsActiveMenu, onCloseMenu } = useToggleMenu()
   const { boardId } = useParams()
   const [innerPageBackground] = useInnerPageBackgroundMutation()

   const addHandler = (id) => {
      const newColorsObj = DYMMY_COLORS.find((item) => item.id === id)
      const newDataColor = {
         boardId,
         value: newColorsObj.image,
         background: true,
      }
      innerPageBackground(newDataColor)
      setIsActiveMenu({})
   }

   return (
      <ModalWrapper isOpen={isActive === 'colors'} onCloseMenu={onCloseMenu}>
         <ForAllWrapper className="forAllWrapper">
            {DYMMY_COLORS.map((item) => (
               <Color key={item.id} {...item} takeId={addHandler} />
            ))}
         </ForAllWrapper>
      </ModalWrapper>
   )
}

export default Colors

export const ForAllWrapper = styled('div')((props) => ({
   width: '340px',
   display: 'grid',
   gridTemplateColumns: props.grid ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
   columnGap: '8px',
   rowGap: '8px',
   padding: '10px 0px 16px 18px',
}))
