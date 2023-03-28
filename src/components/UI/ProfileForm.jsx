import { styled } from '@mui/material'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import Button from './Button'
import PasswordInput from '../input/PasswordInput'
import { usePutProfileMutation } from '../../redux/api/profile-api'
import { validationProfileForm } from '../../utils/constants/validation'
import { authActions } from '../../redux/slice/auth-slice'
import AuthInput from '../input/AuthInput'

const ProfileForm = ({ userInformation, userRole, userPhoto }) => {
   const [changeProfile, { isSuccess, data }] = usePutProfileMutation()
   const dispatch = useDispatch()
   const handleToken = async (data) => {
      const newInfo = await data
      if (newInfo) {
         if (newInfo.newToken) {
            dispatch(
               authActions.loginAuthorization({
                  email: newInfo.email,
                  token: newInfo?.newToken,
               })
            )
         }
      }
   }
   if (isSuccess) {
      handleToken(data)
   }
   useEffect(() => {
      if (isSuccess) {
         toast.success('Profile changed')
      }
   }, [isSuccess])
   const formik = useFormik({
      initialValues: {
         ...userInformation,
         password: '',
         repeatpassword: '',
         photoLink: userPhoto,
      },
      onSubmit: async (values, actions) => {
         await changeProfile(values)

         actions.resetForm()
         actions.setValues({
            password: '',
            repeatpassword: '',
         })
      },
      validationSchema: validationProfileForm,
   })
   return (
      <ProfForm onSubmit={formik.handleSubmit}>
         <StyledUserInput>
            <StyledInput
               iconVariant="end"
               name="name"
               type="text"
               placeholder="name"
               value={formik.values.name}
               onChange={formik.handleChange}
               errors={formik.errors.name}
               touched={formik.touched.name}
            />
            <StyledInput
               iconVariant="end"
               name="surname"
               type="text"
               placeholder="surname"
               value={formik.values.surname}
               onChange={formik.handleChange}
               errors={formik.errors.surname}
               touched={formik.touched.surname}
            />{' '}
            <StyledInput
               iconVariant="end"
               type="email"
               placeholder="email"
               name="email"
               value={formik.values.email}
               onChange={formik.handleChange}
               errors={formik.errors.email}
               touched={formik.touched.email}
               id="email"
               autoComplete="username"
            />
         </StyledUserInput>
         {userRole ? (
            <StyledAdminPassword>
               <BlockPassword>
                  <PasswordInput
                     autoComplete="current-password"
                     placeholder="password"
                     name="password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     error={formik.touched.password && !!formik.errors.password}
                  />{' '}
                  {formik.touched.password && (
                     <ErrorMessage>{formik.errors.password}</ErrorMessage>
                  )}
               </BlockPassword>

               <BlockPassword>
                  <PasswordInput
                     autoComplete="current-password"
                     placeholder="repeat password"
                     name="repeatpassword"
                     value={formik.values.repeatpassword}
                     onChange={formik.handleChange}
                     error={
                        formik.touched.repeatpassword &&
                        !!formik.errors.repeatpassword
                     }
                  />{' '}
                  {formik.touched.repeatpassword && (
                     <ErrorMessage>{formik.errors.repeatpassword}</ErrorMessage>
                  )}
               </BlockPassword>
               <SearchButton>
                  <Button width="64px" type="submit">
                     Save
                  </Button>
               </SearchButton>
            </StyledAdminPassword>
         ) : null}
      </ProfForm>
   )
}

export default ProfileForm

const ProfForm = styled('form')(() => ({
   fontFamily: 'sans-serif',
   width: '800px',
   height: '228px',
   marginTop: '40px',
   display: 'flex',
}))
const StyledInput = styled(AuthInput)(() => ({
   '& .css-1bodi1e-MuiInputBase-root': {
      backgroundColor: 'white',
      border: '#666871',
   },
}))
const SearchButton = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
   marginRight: '10%',
}))
const ErrorMessage = styled('p')(() => ({
   color: 'red',
}))
const BlockPassword = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',
}))
const StyledUserInput = styled('div')(() => ({
   width: '395px',
   margin: '0px',
}))
const StyledAdminPassword = styled('div')(() => ({
   width: '321px',
   display: 'flex',
   marginTop: '18px',
   marginLeft: '30px',
   flexDirection: 'column',
   gap: '22px',
}))
