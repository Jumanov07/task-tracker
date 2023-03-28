import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css'

import { Box, styled, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import Button from '../UI/Button'

import AuthInput from '../input/AuthInput'
import Google from './Google'
import Progress from './ButtonLoading'

import { validationSchemaSigIn } from '../../utils/constants/validation'

import ForgotPassword from './Forgot-Password'
import { useLoginUserMutation } from '../../redux/api/auth-api'
import AuthLayout from './Auth-Layout'

const SignIn = () => {
   const [open, setOpen] = useState(false)

   const [loginUser, { error, isSuccess, isLoading }] = useLoginUserMutation()

   const handleToggle = () => {
      setOpen(!open)
   }

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },

      validationSchema: validationSchemaSigIn,

      onSubmit: async (userData) => {
         await loginUser({ ...userData })
      },
   })
   if (error) {
      toast.error(error.data?.message, {
         toastId: 'error-notification',
      })
   } else if (isSuccess) {
      toast.success(isSuccess?.message, {
         toastId: 'success-notification',
      })
   }

   const { handleChange, values, errors, touched, handleSubmit } = formik

   return (
      <AuthLayout>
         <FormContainer onSubmit={handleSubmit}>
            <SignUpCaption>Sign In</SignUpCaption>
            <Google />

            <AuthInput
               type="email"
               name="email"
               onChange={handleChange}
               value={values.email}
               placeholder="example@gmail.com"
               errors={errors.email}
               touched={touched.email}
            />

            <AuthInput
               name="password"
               onChange={handleChange}
               value={values.password}
               placeholder="Password"
               errors={errors.password}
               touched={touched.password}
            />
            <TermsOfUse>
               <ForgotPasswordDescription
                  variant="caption"
                  onClick={handleToggle}
               >
                  Forgot password?
               </ForgotPasswordDescription>
            </TermsOfUse>
            <StyledButton type="submit">
               {isLoading ? <Progress /> : 'Sign In'}
            </StyledButton>

            <TermsofUseDescription variant="body2">
               Not a member?
               <NavLink
                  className={({ isActive }) =>
                     isActive ? 'active' : 'inactive'
                  }
                  to="/sign-up"
               >
                  Sign up now
               </NavLink>
            </TermsofUseDescription>
         </FormContainer>
         <ForgotPassword open={open} setOpen={setOpen} />
      </AuthLayout>
   )
}

export default SignIn

const FormContainer = styled('form')(() => ({
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   alignItems: 'center',
   width: '321px',
}))

const SignUpCaption = styled('h3')(() => ({
   color: '#000000',
   fontSize: '18px',
   fontWeight: '500px',
}))

const TermsOfUse = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '15px',
}))

const ForgotPasswordDescription = styled(Typography)(() => ({
   marginBottom: '20px',
   position: 'relative',
   right: '-7rem',
   cursor: 'pointer',
}))

const StyledButton = styled(Button)(() => ({
   width: '139px',
   height: '34px',
   borderRadius: '24px',
}))

const TermsofUseDescription = styled(Typography)(() => ({
   margin: '20px 0',
   '& .active': {
      color: '#0079BF',
      paddingLeft: '10px',
   },
   '& .inactive': {
      color: '#0079BF',
      paddingLeft: '10px',
   },
}))
