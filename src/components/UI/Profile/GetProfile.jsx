import { Box, LinearProgress, styled } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import Profile from '../../../layout/Profile'
import { useGetProfileIdQuery } from '../../../redux/api/profile-api'
import { changeWidthActions } from '../../../redux/slice/changeWidthColumns'

const GetProfile = () => {
   const userRole = false
   const { id } = useParams()
   const { data, isLoading } = useGetProfileIdQuery(id)

   const dispatch = useDispatch()

   if (id) {
      dispatch(changeWidthActions.profileById(id))
   }

   if (isLoading)
      return (
         <Box sx={{ width: '100%' }}>
            <LinearProgress />
         </Box>
      )
   return (
      <StyledBackground>
         <Profile userInformation={data} userRole={userRole} />
      </StyledBackground>
   )
}

export default GetProfile
const StyledBackground = styled('div')(() => ({
   height: '90vh',
   backgroundColor: '#f8f8f8',
   width: '100%',
}))
