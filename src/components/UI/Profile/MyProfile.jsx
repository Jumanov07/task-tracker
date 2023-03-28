import { Box, LinearProgress, styled } from '@mui/material'
import React from 'react'
import Profile from '../../../layout/Profile'
import { useGetProfileQuery } from '../../../redux/api/profile-api'

const MyProfile = () => {
   const { data, isLoading } = useGetProfileQuery()
   const userRole = true
   if (isLoading)
      return (
         <Box>
            <LinearProgress />
         </Box>
      )
   return (
      <StyledBackground>
         <Profile userInformation={data} userRole={userRole} />
      </StyledBackground>
   )
}

export default MyProfile
const StyledBackground = styled('div')(() => ({
   width: '100vw',
   height: '90vh',
   backgroundColor: '#f8f8f8',
}))
