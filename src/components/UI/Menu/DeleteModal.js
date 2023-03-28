import { Box, Modal, styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import React from 'react'
import { toast } from 'react-toastify'
import Button from '../Button'
import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'
import { useDeleteInnerBoardMutation } from '../../../redux/api/inner-page-board-api'
import 'react-toastify/dist/ReactToastify.css'

const DeleteModal = ({ isOpen }) => {
   const { boardId, workspaceId } = useParams()
   const id = +boardId
   const navigate = useNavigate()

   const { setIsActiveMenu } = useToggleMenu()
   const [deleteInnerBoard] = useDeleteInnerBoardMutation()

   const deleteBoard = () => {
      deleteInnerBoard(id)
      navigate(`/boards/${workspaceId}`)
      toast.success('Board deleted sucsessfully', {
         autoClose: 2000,
         hideOnHover: true,
      })
   }
   return (
      <Modal open={isOpen}>
         <BoxBackgroundWrapper>
            <h1>Delete task</h1>
            <p>Are you sure to delete this task?</p>
            <ButtonWrapper>
               <ButtonCancel onClick={() => setIsActiveMenu('menu')}>
                  Cancel
               </ButtonCancel>
               <ButtonDelete onClick={deleteBoard}>Delete</ButtonDelete>
            </ButtonWrapper>
         </BoxBackgroundWrapper>
      </Modal>
   )
}

export default DeleteModal

const BoxBackgroundWrapper = styled(Box)(() => ({
   width: '328px',
   height: '146px',
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   background: '#FFFFFF',
   boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.03)',
   borderRadius: '10px',
   animation: 'show-delete .3s forwards',
   margin: '20% auto',

   '@keyframes show-delete': {
      '0%': {
         opacity: '0',
         transform: 'translateY(-20px)',
      },
      '50%': {
         opacity: '1',
      },
      '100%': {
         transform: 'translateY(0px)',
      },
   },
   '& h1': {
      fontSize: '16px',
      fontWeight: '400',
      margin: '0 auto',
      color: '#000000',
      paddingTop: '16px',
   },
   '& p': {
      padding: '16px 0px 24px 20px',
      color: '#919191',
   },
}))

const ButtonWrapper = styled('div')(() => ({
   display: 'flex',
   width: '200px',
   height: '100px',
   gap: '16px',
   padding: '0px 0px 0px 140px',
}))

const ButtonCancel = styled(Button)(() => ({
   borderRadius: '24px',
   background: '#F0F0F0',
   width: '78px',
   height: '34px',
   '&:hover': {
      background: '#F0F0F0',
   },
}))
const ButtonDelete = styled(Button)(() => ({
   borderRadius: '24px',
   background: '#D91212',
   color: '#FFFFFF',
   width: '78px',
   height: '34px',
   '&:hover': {
      background: '#D91212',
   },
}))
