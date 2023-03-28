import React from 'react'
import { Paper, styled, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { ResetButtons, StyledModal } from '../../CreateNewWorkSpace'
import Button from '../Button'
import { useDeleteWorkspaceMutation } from '../../../redux/api/workspace-api'
import { ROUTES } from '../../../utils/constants/routes'

const DeleteModal = ({ open, onClose }) => {
   const { workspaceId } = useParams()
   const navigate = useNavigate()
   const [deleteWorkspace] = useDeleteWorkspaceMutation()
   const deleteWorkspaceHandler = async () => {
      await deleteWorkspace(workspaceId)
      navigate(ROUTES.INDEX)
   }

   return (
      <StyledModal open={open} onClose={onClose}>
         <ModalWrapper elevation={2}>
            <ModalTitle variant="h6">Delete Workspace</ModalTitle>
            <WarningMessage>
               Are you sure to delete this workspace?
            </WarningMessage>
            <ResetButtons>
               <Button onClick={onClose}>Cancel</Button>
               <DeleteButton onClick={deleteWorkspaceHandler} bgcolor="red">
                  Delete
               </DeleteButton>
            </ResetButtons>
         </ModalWrapper>
      </StyledModal>
   )
}

export default DeleteModal

const ModalWrapper = styled(Paper)(() => ({
   width: '350px',
   height: '152px',
   padding: '11px 16px',
   borderRadius: '10px',
}))

const ModalTitle = styled(Typography)(() => ({
   display: 'flex',
   justifyContent: 'center',
   fontSize: '17px',
   fontWeight: '600',
}))

const WarningMessage = styled(Typography)(() => ({
   display: 'flex',
   justifyContent: 'center',
   color: '#919191',
   margin: '15px 0',
}))

const DeleteButton = styled(Button)(() => ({
   ':hover': {
      background: 'red',
   },
}))
