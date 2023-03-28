import { Box, styled } from '@mui/material'
import React from 'react'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import AuthInput from '../input/AuthInput'
import Button from '../UI/Button'
import ModalWindow from '../UI/ModalWindow'
import ModalTitle from './ModalTitle'

const CheckList = () => {
   const { board, setIsActiveMenu } = useToggleMenu()
   return (
      <ModalWindow
         open={board === 'check-list-card'}
         handleClose={() => setIsActiveMenu('card')}
      >
         <Container>
            <ModalTitle>Add checklist</ModalTitle>

            <AuthInput type="text" placeholder="Title" />
            <StyledButton>Add checklist</StyledButton>
         </Container>
      </ModalWindow>
   )
}

const Container = styled(Box)(() => ({
   width: '284px',
   height: '140px',
   borderRadius: '10px',
}))

const StyledButton = styled(Button)(() => ({
   width: '244px',
   position: 'absolute',
   bottom: '16px',
   left: '33px',
}))

export default CheckList
