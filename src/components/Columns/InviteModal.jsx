import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useFormik } from 'formik'
import { Remove } from '../../assets/icons'
import { inviteEmail } from '../../utils/constants/validation'
import AuthInput from '../input/AuthInput'
import Button from '../UI/Button'
import ModalWindow from '../UI/ModalWindow'
import RadioButton from '../input/Radio'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'

const InviteModal = ({ addInviteMemberToWorkspace }) => {
   const [roleInvite, setRoleInvite] = useState('')

   const { onCloseMenu, isActive } = useToggleMenu()

   const formik = useFormik({
      initialValues: {
         email: '',
      },

      validationSchema: inviteEmail,

      onSubmit: ({ email }) => {
         const params = { email, roleInvite }
         addInviteMemberToWorkspace(params)
         resetForm()
         setRoleInvite('')
      },
   })
   const removeMemberandEmail = () => {
      onCloseMenu()
      resetForm()
      setRoleInvite('')
   }
   const { values, handleChange, handleSubmit, isValid, dirty, resetForm } =
      formik
   return (
      <ModalWindow
         open={isActive === 'invite'}
         handleClose={removeMemberandEmail}
      >
         <StyledModalWrapper>
            <NameAndRemoveWrapper>
               <h4>Invite a new participant</h4>
               <span>
                  <Remove onClick={removeMemberandEmail} className="remove" />
               </span>
            </NameAndRemoveWrapper>
            <form onSubmit={handleSubmit}>
               <AuthInput
                  type="email"
                  placeholder="example@gmail.com"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
               />

               <RadioButton className="radio" setRadiovalue={setRoleInvite} />

               <StyledButton>
                  <Button
                     type="button"
                     className="button"
                     onClick={removeMemberandEmail}
                  >
                     Cancel
                  </Button>

                  <Button
                     type="submit"
                     className="button"
                     disabled={!isValid || !dirty || !roleInvite}
                  >
                     Create
                  </Button>
               </StyledButton>
            </form>
         </StyledModalWrapper>
      </ModalWindow>
   )
}
const StyledModalWrapper = styled('div')(() => ({
   width: '400px',
   height: '170px',

   '& .radio': {
      marginBottom: '10px',
   },
   '& .remove': {
      cursor: 'pointer',
   },
}))

const NameAndRemoveWrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   gap: '120px',
   color: '#000000',
}))

const StyledButton = styled('div')(() => ({
   display: 'flex',
   position: 'absolute',
   right: '20px',
   bottom: '16px',
   gap: '18px',
   '& .button': {
      width: '80px',
      height: '34px',
   },
}))
export default InviteModal
