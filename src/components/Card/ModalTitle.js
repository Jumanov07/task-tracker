import { styled } from '@mui/material'
import React from 'react'
import { Remove } from '../../assets/icons/index'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'

const ModalTitle = ({ children }) => {
   const { setIsActiveMenu, board } = useToggleMenu()
   return (
      <Container>
         <h4>{children}</h4>
         <Remove
            className="remove"
            onClick={() => setIsActiveMenu('card', board)}
         />
      </Container>
   )
}

const Container = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',

   '& h4': {
      fontSize: '16px',
      fontWeight: '400',
      color: '#000000',
      position: 'relative',
      bottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   '& .remove': {
      position: 'absolute',
      right: '20px',
      cursor: 'pointer',
   },
}))

export default ModalTitle
