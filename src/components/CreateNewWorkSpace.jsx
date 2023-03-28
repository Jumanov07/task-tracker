import React, { useState } from 'react'
import { Box, InputBase, Modal, Paper, styled, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useFormik } from 'formik'
import Button from './UI/Button'
import { useCreateNewWorkspaceMutation } from '../redux/api/workspace-api'
import { workspaceValidation } from '../utils/constants/validation'

const CreateNewWorkSpace = ({ open, handleMove }) => {
   const [email, setEmail] = useState('')
   const [members, setMembers] = useState([])
   const [createNewWorkSpace] = useCreateNewWorkspaceMutation()

   const submitForm = async (values, { resetForm }) => {
      const membersCopy = [...members]
      const backendData = {
         name: values.name,
         emails: membersCopy,
         link: 'http://localhost:3000/sign-up',
      }
      if (backendData.emails.length === 0) {
         delete backendData.emails
         delete backendData.link
      }
      await createNewWorkSpace(backendData)
      resetForm()
      setMembers([])
      setEmail('')
      handleMove()
   }

   const formik = useFormik({
      validationSchema: workspaceValidation,
      initialValues: {
         name: '',
      },
      onSubmit: submitForm,
   })

   const { handleBlur, isValid } = formik

   const handleInviteMember = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
               email
            )
         ) {
            setMembers([...members, email])
            setEmail('')
         }
      }
   }
   const deleteMemberHandler = (index) => {
      const newMembersList = members.filter((item, i) => i !== index)
      setMembers(newMembersList)
   }

   return (
      <StyledModal open={open} onClose={handleMove}>
         <ModalWrapper elevation={2}>
            <ModalTitle variant="body2">Create a new workspace</ModalTitle>
            <form onSubmit={formik.handleSubmit}>
               <InputLabel>Name of the workspace*</InputLabel>
               <StyledInput
                  fullWidth
                  placeholder="Name"
                  name="name"
                  onBlur={handleBlur}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  maxLength={10}
               />
               <InputLabel>Invite a member</InputLabel>
               <InviteMembersWrapper>
                  {members?.map((member, index) => (
                     <InvitedMember key={member}>
                        <p>{member}</p>
                        <p onClick={() => deleteMemberHandler(index)}>
                           <ClearIcon
                              style={{ width: '20px', height: '20px' }}
                           />
                        </p>
                     </InvitedMember>
                  ))}
                  <MembersInput
                     type="email"
                     fullWidth
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="example@gmail.com"
                     onKeyPress={handleInviteMember}
                     variant="outlined"
                     onBlur={handleBlur}
                     name="email"
                  />
               </InviteMembersWrapper>
               <ResetButtons>
                  <CancelButton onClick={handleMove}>Cancel</CancelButton>
                  <Button
                     disabled={!isValid || !formik.values.name.length}
                     type="submit"
                  >
                     Create
                  </Button>
               </ResetButtons>
            </form>
         </ModalWrapper>
      </StyledModal>
   )
}

export default CreateNewWorkSpace

export const CancelButton = styled(Button)(() => ({
   background: '#F0F0F0',
   color: '#919191',
   '&:hover': {
      background: '#F0F0F0',
      color: '#919191',
   },
}))

export const StyledModal = styled(Modal)(() => ({
   width: '100vw',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const ModalWrapper = styled(Paper)(() => ({
   width: '361px',
   minHeight: '260px',
   borderRadius: '10px',
   padding: '16px',
   display: 'flex',
   flexDirection: 'column',
   margin: '0 16px',
}))

const StyledInput = styled(InputBase)(() => ({
   border: '1px solid #D0D0D0',
   borderRadius: '8px',
   padding: '6px 16px',
   height: '32px',
   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
      {
         WebkitTransition:
            'color 9999s ease-out, background-color 9999s ease-out',
         WebkitTransitionDelay: '9999s',
      },
}))

const InviteMembersWrapper = styled('div')(() => ({
   border: '1px solid #D0D0D0',
   borderRadius: '8px',
   width: 'inherit',
   padding: '6px 16px',
}))

export const ResetButtons = styled(Box)(() => ({
   display: 'flex',
   alignSelf: 'flex-end',
   justifyContent: 'end',
   gap: '20px',
   marginTop: '30px',
   '& > button': {
      width: '78px',
      height: '34px',
      fontSize: '16px',
   },
}))

const InputLabel = styled(Typography)(() => ({
   color: '#919191',
   margin: '8px 6px',
   fontSize: '14px',
}))

const ModalTitle = styled(Typography)(() => ({
   display: 'flex',
   justifyContent: 'center',
   margin: '8px 0',
   fontSize: '16px',
   lineHeight: '17.6px',
}))

const InvitedMember = styled(Box)(() => ({
   height: '20px',
   display: 'flex',
   justifyContent: 'space-between',
   background: '#f0f0f0',
   color: '#919191',
   borderRadius: '8px',
   padding: '0 16px',
   margin: '8px 0',
}))

const MembersInput = styled(InputBase)(() => ({
   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
      {
         WebkitTransition:
            'color 9999s ease-out, background-color 9999s ease-out',
         WebkitTransitionDelay: '9999s',
      },

   outline: 'none',
   border: 'none',
}))
