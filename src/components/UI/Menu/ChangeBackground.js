import React from 'react'
import { styled } from '@mui/material'

import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'
import { BoxWrapper, MenuModalContainer } from './ModalWrapper'
import MenuTitle from './MenuTitle'
import Photos from './Photos'
import Colors from './Colors'

import ColorsForBackground from '../../../assets/images/colors.svg'
import Mountain from '../../../assets/images/mountain.svg'

const ChangeBackground = () => {
   const { setIsActiveMenu, isActive, onCloseMenu } = useToggleMenu()

   return (
      <>
         <MenuModalContainer
            open={isActive === 'change the background'}
            onClose={() => onCloseMenu()}
         >
            <BoxBackgroundWrapper>
               <MenuTitle
                  iconForBack={() => setIsActiveMenu('menu')}
                  imgRemove={() => onCloseMenu()}
               />
               <ImgWrapper>
                  <img
                     src={Mountain}
                     alt="mountain"
                     onClick={() => setIsActiveMenu('photos')}
                  />
                  <img
                     src={ColorsForBackground}
                     alt="color"
                     onClick={() => setIsActiveMenu('colors')}
                  />
               </ImgWrapper>
            </BoxBackgroundWrapper>
         </MenuModalContainer>
         <Photos />
         <Colors />
      </>
   )
}

export default ChangeBackground

const BoxBackgroundWrapper = styled(BoxWrapper)(() => ({
   height: '152px',
   justifyContent: 'center',
}))

const ImgWrapper = styled('div')(() => ({
   width: '300px',
   display: 'grid',
   gridTemplateColumns: '1fr 1fr',
   columnGap: '10px',
   paddingLeft: '18px',
   paddingTop: '10px',
}))
