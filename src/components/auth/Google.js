import { Avatar, styled } from '@mui/material'

import { GoogleIcon } from '../../assets/icons'
import { useSignInWithGoogleMutation } from '../../redux/api/auth-api'

const Google = () => {
   const [signInWithGoogle] = useSignInWithGoogleMutation()

   return (
      <>
         <StyledContainer>
            <StyledBlock>
               <Avatar src="/" alt="T" />
               <div>
                  <NameExample>Sign Up as Nazira</NameExample>
                  <EmailExample>example@gmail.com</EmailExample>
               </div>
            </StyledBlock>
            <GoogleIcon onClick={signInWithGoogle} />
         </StyledContainer>
         <DivOr>or</DivOr>
      </>
   )
}

export default Google

const StyledContainer = styled('div')(() => ({
   display: 'grid',
   alignItems: 'center',
   gridTemplateColumns: '80% 0%',
   gridColumnGap: '20px',
   width: '321px',
   height: '58px',
   marginTop: '18px',
   borderRadius: '8px',
   padding: '5px 13px',
   background: '#F0F0F0',
   cursor: 'pointer',
}))

const StyledBlock = styled('div')(() => ({
   display: 'flex',
   gap: '15px',
}))

const DivOr = styled('div')(() => ({
   color: '#919191',
   marginTop: '10px',
}))

const NameExample = styled('p')(() => ({
   color: '#919191',
   fontSize: '16px',
}))

const EmailExample = styled('p')(() => ({
   color: '#B2B2B2',
   fontSize: '14px',
}))
