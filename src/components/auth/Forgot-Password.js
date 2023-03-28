import * as React from 'react'

import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { Box, styled, Typography } from '@mui/material'

import AuthInput from '../input/AuthInput'
import Button from '../UI/Button'
import ModalWindow from '../UI/ModalWindow'

import { validationEmailInForgotPassword } from '../../utils/constants/validation'
import { useForgotPasswordMutation } from '../../redux/api/auth-api'
import Progress from './ButtonLoading'

const ForgotPassword = ({ open, setOpen }) => {
   const [forgotPassword, { isLoading, data, error, isSuccess }] =
      useForgotPasswordMutation()

   const handleClose = () => {
      setOpen(false)
   }

   const formik = useFormik({
      initialValues: {
         email: '',
      },

      validationSchema: validationEmailInForgotPassword,

      onSubmit: async ({ email }) => {
         forgotPassword({
            email,
            link: 'http://localhost:3000/forgot-password',
         })
      },
   })

   React.useEffect(() => {
      if (error) {
         toast.error(error.data?.message, {
            toastId: 'error-notification',
         })
      } else if (isSuccess) {
         toast.success(data?.message, {
            toastId: 'success-notification',
         })
         handleClose()
      }
   }, [isSuccess, error])

   const { handleChange, values, errors, touched } = formik

   return (
      <ModalWindow open={open} handleClose={handleClose}>
         <ModalWindowForgot>
            <TypographyForgot variant="h6">Forgot password?</TypographyForgot>

            <TypographyDescription>
               A link will be sent to your Email, follow the link sent to the
               mail
            </TypographyDescription>

            <FormSubmit onSubmit={formik.handleSubmit}>
               <StyledAuthInput
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Enter email id / username"
                  errors={errors.email}
                  touched={touched.email}
               />

               <StyledButton type="submit">
                  {isLoading ? <Progress /> : 'Send'}
               </StyledButton>
            </FormSubmit>
         </ModalWindowForgot>
      </ModalWindow>
   )
}

export default ForgotPassword

const ModalWindowForgot = styled(Box)(() => ({
   width: '410px',
   height: '190px',
}))

const TypographyForgot = styled(Typography)(() => ({
   fontWeight: '400',
   display: 'flex',
   justifyContent: 'start',
   paddingTop: '20px',
   paddingLeft: '20px',
}))

const TypographyDescription = styled(Typography)(() => ({
   fontSize: '14px',
   color: '#707070',
   textAlign: 'none',
   marginTop: '10px',
   marginRight: '15px',
}))

const FormSubmit = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
}))

const StyledAuthInput = styled(AuthInput)(() => ({
   width: '100%',
}))

const StyledButton = styled(Button)(() => ({
   position: 'relative',
   left: '8.5rem',
   top: '25px',
}))
