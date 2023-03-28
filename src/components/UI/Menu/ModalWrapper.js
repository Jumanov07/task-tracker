import React from 'react'

import { Box, Modal, styled } from '@mui/material'

import MenuTitle from './MenuTitle'
import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'

const ModalWrapper = ({ children, isOpen, text, onCloseMenu, archived }) => {
   const { setIsActiveMenu } = useToggleMenu()

   return (
      <MenuModalContainer open={isOpen} onClose={onCloseMenu}>
         <BoxWrapper archived={archived}>
            <MenuTitlePhotos>
               {text ? (
                  <MenuTitle />
               ) : (
                  <MenuTitle
                     iconForBack={() =>
                        setIsActiveMenu('change the background')
                     }
                     imgRemove={() => setIsActiveMenu('menu')}
                  />
               )}
            </MenuTitlePhotos>
            {children}
         </BoxWrapper>
      </MenuModalContainer>
   )
}

export default ModalWrapper

export const MenuModalContainer = styled(Modal)(() => ({
   '& .MuiBackdrop-root': {
      background: 'none',
   },
}))

export const BoxWrapper = styled(Box)(({ archived }) => ({
   width: archived ? '322px' : '367px',
   maxHeight: '600px',
   display: 'flex',
   flexDirection: 'column',
   boxShadow: '0 2px 8px rgb(87, 83, 80)',
   background: '#FFFFFF',
   borderRadius: '10px',
   animation: 'show-menu .1s forwards',
   position: 'absolute',
   top: '10px',
   right: '10px',

   '@keyframes show-menu': {
      '0%': {
         opacity: '0',
         transform: 'translateX(200px)',
      },
      '50%': {
         opacity: '1',
      },
      '100%': {
         transform: 'translateY(0px)',
      },
   },
}))

const MenuTitlePhotos = styled('div')(() => ({
   padding: '17px 5px 1px 6px',
}))
