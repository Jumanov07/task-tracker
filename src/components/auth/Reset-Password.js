import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { styled } from '@mui/material'

import Button from '../UI/Button'

import AuthInput from '../input/AuthInput'
import Progress from './ButtonLoading'

import { validationForgotPassword } from '../../utils/constants/validation'

import { useResetPasswordMutation } from '../../redux/api/auth-api'
import AuthLayout from './Auth-Layout'

const ResetPassword = () => {
   const params = useParams()

   const userIdNum = Number(params.userId)

   const [resetPassword, { isLoading }] = useResetPasswordMutation()

   const navigate = useNavigate()

   const formik = useFormik({
      initialValues: {
         password: '',
         retypePassword: '',
      },

      validationSchema: validationForgotPassword,

      onSubmit: async ({ password }) => {
         await resetPassword({ newPassword: password, userId: userIdNum })
         navigate('/sign-in')
      },
   })

   const { handleChange, values, errors, touched, handleSubmit } = formik

   return (
      <AuthLayout>
         <FormContainer onSubmit={handleSubmit}>
            <SignUpCaption>Password</SignUpCaption>

            <AuthInput
               name="password"
               onChange={handleChange}
               value={values.password}
               placeholder="Password"
               errors={errors.password}
               touched={touched.password}
            />

            <AuthInput
               name="retypePassword"
               onChange={handleChange}
               value={values.retypePassword}
               placeholder="Repeat password"
               errors={errors.retypePassword}
               touched={touched.retypePassword}
            />

            <StyledButton type="submit">
               {isLoading ? <Progress /> : 'Log in'}
            </StyledButton>
         </FormContainer>
      </AuthLayout>
   )
}

export default ResetPassword

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

const StyledButton = styled(Button)(() => ({
   width: '139px',
   height: '34px',
   borderRadius: '24px',
   marginTop: '26px',
}))
