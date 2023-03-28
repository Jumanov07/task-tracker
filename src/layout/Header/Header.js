import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router'

import {
   Box,
   ListItemText,
   styled,
   Toolbar as MuiContainer,
   Typography,
} from '@mui/material'

import { useSelector } from 'react-redux'
import Favourites from './Favourites'
import TaskTracker from '../../assets/images/taskTrackerLogo.svg'
import Notification from './notification/Notification'
import ProfileUser from './ProfileUser'
import Search from '../../components/UI/Search/Search'
import { ROUTES } from '../../utils/constants/routes'
import { useGetProfileQuery } from '../../redux/api/profile-api'
import { useGetAllUsersQuery } from '../../redux/api/search-users-api'

const Header = () => {
   const { data: profilePhoto } = useGetProfileQuery()
   const navigate = useNavigate()
   const { profileID } = useSelector((state) => state.changeWidthColumns)
   const toMyProfile = () => {
      return navigate('/profile')
   }
   const location = useLocation()
   const [searchData, setSearchData] = useState('')
   const { workspaceId } = useParams()
   const { email } = useSelector((state) => state.auth)

   const addSearchUser = (id, userEmail) => {
      if (email === userEmail) {
         setSearchData('')
         navigate(ROUTES.PROFILE)
      } else {
         setSearchData('')
         navigate(`${ROUTES.PROFILE}/${id}`)
      }
   }

   const { data } = useGetAllUsersQuery(
      {
         workspaceId,
         params: { email: searchData },
      },
      { skip: !searchData.length > 0 }
   )

   useEffect(() => {
      return () => {
         setSearchData('')
      }
   }, [])

   return (
      <Toolbar>
         <BoxContainer className="logo">
            <img
               onClick={() => navigate(ROUTES.INDEX)}
               src={TaskTracker}
               alt="task tracker"
            />
            {location.pathname !== ROUTES.PROFILE &&
            location.pathname !== ROUTES.PARTICIPANTS ? (
               <Favourites />
            ) : null}
         </BoxContainer>

         <StyledSearchNotifBadge>
            {location.pathname !== ROUTES.INDEX &&
            location.pathname !== `${ROUTES.PROFILE}/${profileID}` ? (
               <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Search
                     type="email"
                     value={searchData}
                     onChange={(e) => setSearchData(e.target.value)}
                     placeholder="Search users by email"
                     iconVariant="end"
                  />

                  {searchData &&
                     data?.map((user) => (
                        <StyledUser
                           key={user.id}
                           onClick={() => addSearchUser(user.id, user.email)}
                           primary={
                              <Typography>
                                 {user.firstName}
                                 {'  '}
                                 {user.lastName}
                              </Typography>
                           }
                           secondary={user.email}
                        />
                     ))}
               </Box>
            ) : null}
            <BoxContainer>
               <Notification />
               <ProfileUser
                  onClickProfile={toMyProfile}
                  photo={profilePhoto ? profilePhoto.photoLink : 'T'}
               />
            </BoxContainer>
         </StyledSearchNotifBadge>
      </Toolbar>
   )
}
export default Header

const Toolbar = styled(MuiContainer)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '32.67px',
   height: '70px',
   background: '#FFFFFF',
   position: 'sticky',
   top: 0,
   width: '100%',
   zIndex: 1,
   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.03)',

   '&.MuiContainer-root': {
      padding: '0px 40px 0px 44px',
   },
   '& img': {
      cursor: 'pointer',
   },
}))

const BoxContainer = styled(Box)(() => ({
   display: 'flex',
   '& img': {
      cursor: 'pointer',
   },

   '&.logo': {
      justifyContent: 'space-beetween',
      alignItems: 'center',
      gap: '79px',
   },

   '& .MuiBadge-root': {
      width: '27px',
      height: '27px',
      top: '7px',
      right: '5px',
      cursor: 'pointer',
   },

   '& .MuiBadge-badge': {
      width: '18px',
      height: '16px',
      fontSize: '10px',
      right: '6px',
      top: '3px',
   },
}))

const StyledSearchNotifBadge = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-beetween',
   alignItems: 'center',
   gap: '32.76px',
}))

const StyledUser = styled(ListItemText)(() => ({
   position: 'fixed',
   top: '55px',
   borderRadius: '8px',
   background: '#e6eaed',
   padding: '4px 8px',
   boxShadow: '0px 5px 5px -5px rgba(34, 60, 80, 0.6)',
}))
