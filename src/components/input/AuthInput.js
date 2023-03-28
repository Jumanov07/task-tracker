import { styled, Typography, InputBase } from '@mui/material'

import PasswordInput from './PasswordInput'

const AuthInput = ({
   value,
   onChange,
   onBlur,
   type,
   error,
   placeholder,
   name,
   errors,
   touched,
   top,
}) => {
   return (
      <InputErrorMessageContainer>
         {type ? (
            <StyledInput
               top={top}
               type={type}
               fullWidth
               name={name}
               error={error}
               value={value}
               onChange={onChange}
               placeholder={placeholder}
               inputProps={{
                  classes: { root: 'input' },
               }}
            />
         ) : (
            <StyledPasswordInput
               value={value}
               name={name}
               onChange={onChange}
               onBlur={onBlur}
               placeholder={placeholder}
               autoComplete={name}
            />
         )}

         <ErrorMessages variant="body5">
            {errors && touched && errors}
         </ErrorMessages>
      </InputErrorMessageContainer>
   )
}

export default AuthInput
const InputErrorMessageContainer = styled('div')(() => ({
   width: '100%',
   height: '54px',
}))

export const StyledInput = styled(InputBase)(({ top }) => ({
   border: '1px solid #D0D0D0',
   height: '32px',
   borderRadius: '8px',
   color: '#00000',
   padding: '6px 16px',
   marginTop: top ? '0' : '18px',
   fontSize: '14px',
   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
      {
         WebkitTransition:
            'color 9999s ease-out, background-color 9999s ease-out',
         WebkitTransitionDelay: '9999s',
      },
   '&.MuiInputBase-root': {
      '& ::placeholder': {
         color: '#AFAFAF',
      },
   },
}))

const StyledPasswordInput = styled(PasswordInput)(() => ({
   width: '321px',
   height: '32px',
   border: '1px solid #D0D0D0',
   borderRadius: '8px',
   color: '#00000',
   padding: '6px 9px 6px 2px',
   fontSize: '14px',
   fontWeight: '400',
   marginTop: '18px',
   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
      {
         WebkitTransition:
            'color 9999s ease-out, background-color 9999s ease-out',
         WebkitTransitionDelay: '9999s',
      },
   '&:hover': {
      border: '1px solid #D0D0D0',
   },
   '&.MuiInputBase-root': {
      '& ::placeholder': {
         color: '#AFAFAF',
      },
   },
}))

const ErrorMessages = styled(Typography)(() => ({
   paddingTop: '5px',
   fontSize: '14px',
   color: 'red',
}))
