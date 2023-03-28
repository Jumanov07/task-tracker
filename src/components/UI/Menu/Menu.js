import React from 'react'

import { styled } from '@mui/material'

import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'
import Button from '../Button'
import ModalMenu from './ModalMenu'

import { MenuBoard } from '../../../assets/icons'

const Menu = () => {
   const { setIsActiveMenu, isActive } = useToggleMenu()

   return (
      <>
         <MenuButton disableRipple onClick={() => setIsActiveMenu('menu')}>
            <MenuBoard /> Menu
         </MenuButton>
         <ModalMenu isOpen={isActive === 'menu'} />
      </>
   )
}

export default Menu

const MenuButton = styled(Button)(() => ({
   background: '#E9E9E9',
   width: '96px',
   height: '34px',
   color: '#438AB4',
   gap: '8px',
   fontSize: '14px',
   fontWeight: '500',
   '&:hover': {
      background: '#E9E9E9',
   },
}))
