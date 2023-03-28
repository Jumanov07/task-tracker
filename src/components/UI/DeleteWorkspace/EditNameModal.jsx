import React, { useState } from 'react'
import { InputBase, Modal, Paper, styled, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import Button from '../Button'
import { CancelButton, ResetButtons } from '../../CreateNewWorkSpace'
import DeleteModal from './DeleteModal'
import { updateWorkspaceNameValidation } from '../../../utils/constants/validation'
import {
   useLazyGetSingleWorkspaceQuery,
   useUpdateWorkspaceNameMutation,
} from '../../../redux/api/workspace-api'

const EditModal = ({ open, onClose }) => {
   const [isOpenModal, setIsOpenModal] = useState(false)
   const { email } = useSelector((state) => state.auth)
   const handleOpen = () => {
      setIsOpenModal((prev) => !prev)
   }
   const { workspaceId } = useParams()
   const [updateWorkspaceName] = useUpdateWorkspaceNameMutation(undefined)
   const [triggerGetWorkspaceById] = useLazyGetSingleWorkspaceQuery()

   const formik = useFormik({
      validationSchema: updateWorkspaceNameValidation,
      initialValues: {
         name: '',
      },
      onSubmit: async (values, { resetForm }) => {
         const backendData = {
            name: values.name,
            emails: [email],
            link: 'https://github.com/peaksoft-school/task-tracker-js7',
         }
         await updateWorkspaceName({ id: workspaceId, body: backendData })
         triggerGetWorkspaceById(workspaceId)
         resetForm()
         onClose()
      },
   })
   return (
      <>
         <StyledModal open={open} onClose={onClose}>
            <ModalWrapper elevation={2}>
               <ModalTitle variant="h6">Setting</ModalTitle>
               <form onSubmit={formik.handleSubmit}>
                  <StyledInput
                     placeholder="Name of the workspace"
                     name="name"
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     fullWidth
                  />
                  <DeleteMessage
                     variant="subtitle1"
                     onClick={() => {
                        handleOpen()
                        onClose()
                     }}
                  >
                     Delete this workspace?
                  </DeleteMessage>
                  <ResetButtons>
                     <CancelButton onClick={onClose}>Cancel</CancelButton>
                     <Button type="submit">Submit</Button>
                  </ResetButtons>
               </form>
            </ModalWrapper>
         </StyledModal>
         <DeleteModal open={isOpenModal} onClose={handleOpen} />
      </>
   )
}

export default EditModal
const StyledModal = styled(Modal)(() => ({
   width: '100vw',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const ModalWrapper = styled(Paper)(() => ({
   width: '550px',
   height: '220px',
   borderRadius: '10px',
   padding: '8px 16px',
}))

const ModalTitle = styled(Typography)(() => ({
   display: 'flex',
   justifyContent: 'center',
   margin: '8px 0 0',
}))

const StyledInput = styled(InputBase)(() => ({
   border: '1px solid #D0D0D0',
   borderRadius: '8px',
   padding: '6px 16px',
   height: '45px',
   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
      {
         WebkitTransition:
            'color 9999s ease-out, background-color 9999s ease-out',
         WebkitTransitionDelay: '9999s',
      },
}))

const DeleteMessage = styled(Typography)(() => ({
   color: 'red',
   margin: '20px 0',
   ':hover': {
      cursor: 'pointer',
   },
}))
