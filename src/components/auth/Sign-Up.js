import { NavLink } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Box, styled, Typography } from '@mui/material'

import { useFormik } from 'formik'
import { schema } from '../../utils/constants/validation'

import Button from '../UI/Button'
import CheckBox from '../UI/CheckBox'

import AuthInput from '../input/AuthInput'
import Progress from './ButtonLoading'
import Google from './Google'

import { useRegisterUserMutation } from '../../redux/api/auth-api'
import AuthLayout from './Auth-Layout'

const SignUp = () => {
   const [registerUser, { isLoading, error }] = useRegisterUserMutation()

   const formik = useFormik({
      initialValues: {
         name: '',
         surname: '',
         email: '',
         password: '',
         retypePassword: '',
         remember: false,
      },

      validationSchema: schema,

      onSubmit: async (registerData) => {
         if (error) {
            toast.error(error.data?.message, {
               toastId: 'error-notification',
            })
         } else {
            await registerUser({ ...registerData })
         }
      },
   })

   const { handleChange, values, errors, touched, handleSubmit } = formik

   return (
      <AuthLayout>
         <FormContainer onSubmit={handleSubmit}>
            <SignUpCaption>Sign Up</SignUpCaption>

            <Google />

            <AuthInput
               type="text"
               name="name"
               value={values.name}
               placeholder="Name"
               onChange={handleChange}
               errors={errors.name}
               touched={touched.name}
            />

            <AuthInput
               type="text"
               name="surname"
               value={values.surname}
               placeholder="Surname"
               onChange={handleChange}
               errors={errors.surname}
               touched={touched.surname}
            />

            <AuthInput
               type="email"
               name="email"
               onChange={handleChange}
               value={values.email}
               placeholder="Enter email id / username"
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

            <AuthInput
               name="retypePassword"
               onChange={handleChange}
               value={values.retypePassword}
               placeholder="Repeat password"
               errors={errors.retypePassword}
               touched={touched.retypePassword}
            />

            <TermsOfUse>
               <CheckBox
                  value={isLoading}
                  {...formik.getFieldProps('remember')}
               />

               <TermsofUseDescription variant="caption">
                  Creating an account means you`re okay with our
                  <br />
                  <NavLink
                     className={({ isActive }) =>
                        isActive ? 'active' : 'inactive'
                     }
                     to="/"
                  >
                     Terms of Service, Privacy Policy.
                  </NavLink>
               </TermsofUseDescription>
            </TermsOfUse>
            <StyledButton type="submit">
               {isLoading ? <Progress /> : 'Sign Up'}
            </StyledButton>

            <TermsofUseDescription variant="body2">
               You already have an account?{' '}
               <NavLink
                  className={({ isActive }) =>
                     isActive ? 'active' : 'inactive'
                  }
                  to="/sign-in"
               >
                  Log In
               </NavLink>
            </TermsofUseDescription>
         </FormContainer>
      </AuthLayout>
   )
}

export default SignUp

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

const StyledButton = styled(Button)(() => ({
   width: '139px',
   height: '34px',
   borderRadius: '24px',
}))

const TermsofUseDescription = styled(Typography)(() => ({
   margin: '20px 0',
   '&.active': {
      color: '#0079BF',
   },
   '& .inactive': {
      color: '#0079BF',
   },
}))
