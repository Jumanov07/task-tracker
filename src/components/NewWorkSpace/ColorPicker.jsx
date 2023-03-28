import React from 'react'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import { DYMMY_COLORS } from '../UI/Menu'
import Color from '../UI/Menu/Color'
import { ForAllWrapper } from '../UI/Menu/Colors'
import ModalWrapper from '../UI/Menu/ModalWrapper'

const ColorPicker = ({ pickColor, setPickColor, addHandler }) => {
   const { setIsActiveMenu, board } = useToggleMenu()

   const handlerId = (id) => {
      setPickColor(id)
      addHandler(id)
   }
   return (
      <ModalWrapper
         isOpen={board === 'colors'}
         onCloseMenu={() => setIsActiveMenu('createBoard')}
      >
         <ForAllWrapper>
            {DYMMY_COLORS.map((item) => (
               <Color
                  key={item.id}
                  {...item}
                  takeId={handlerId}
                  colorId={pickColor}
               />
            ))}
         </ForAllWrapper>
      </ModalWrapper>
   )
}

export default ColorPicker
