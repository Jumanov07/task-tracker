import { Box, styled } from '@mui/material'

import 'react-toastify/dist/ReactToastify.css'

import TaskTracker from '../../assets/images/taskTrackerLogo.svg'
import ImagesSignIn from '../../assets/images/imgSign-in.svg'

const AuthLayout = ({ children }) => {
   return (
      <SignUpPage>
         <MiniContainer>
            <StyledLogoTaskTracker src={TaskTracker} alt="task tracker" />
            {children}
         </MiniContainer>
         <TaskTrackerImages />
      </SignUpPage>
   )
}

export default AuthLayout

const SignUpPage = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '120px',
}))

const MiniContainer = styled('div')(() => ({
   display: 'flex',
   gap: '5px',
}))

const StyledLogoTaskTracker = styled('img')(() => ({
   width: '167px',
   height: '67px',
   margin: '0 0px 0px 20px',
}))

const TaskTrackerImages = styled('div')(() => ({
   width: '40vw',
   height: '100vh',
   backgroundImage: `url(${ImagesSignIn})`,
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',
   marginRight: '50px',
}))
