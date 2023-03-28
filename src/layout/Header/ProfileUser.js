import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Menu, MenuItem, Stack, styled } from '@mui/material'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import ProfileModal from './Profile-Modal'

const ProfileUser = ({ onClickProfile, photo }) => {
   const { email } = useSelector((state) => state.auth)
   const forProfile = email.substring(-1, 1)
   const [anchorEl, setAnchorEl] = useState(null)
   const { setIsActiveMenu } = useToggleMenu()

   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <div>
         <ImgWrapper>
            <Avatar src={photo} alt={forProfile} onClick={handleMenu} />
         </ImgWrapper>

         <StyledMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
         >
            <MenuItem onClick={onClickProfile}>Profile</MenuItem>
            <MenuItem
               className="profile"
               onClick={() => setIsActiveMenu('user-logout')}
            >
               Logout
            </MenuItem>
         </StyledMenu>
         <ProfileModal setAnchorEl={setAnchorEl} />
      </div>
   )
}

export default ProfileUser

const ImgWrapper = styled(Stack)(() => ({
   padding: '0px 20px 0px 20px',
   '& .img': {
      width: '32px',
      height: '32px',
      cursor: 'pointer',
      borderRaduis: '50%',
   },
}))

const StyledMenu = styled(Menu)(() => ({
   '& .MuiList-root': {
      width: '158px',
      height: '84px',
      borderRaduis: '10px',
      color: '#000000',
   },

   '& .MuiMenuItem-root': {
      color: '#000000',
      transitionDuration: '0.3s',
   },
}))
