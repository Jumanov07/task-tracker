import React from 'react'
import { styled } from '@mui/material'
import ModalWindow from '../../components/UI/ModalWindow'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import Button from '../../components/UI/Button'
import { loggedOut } from '../../utils/helpers/general'

const ProfileModal = ({ setAnchorEl }) => {
   const { isActive, onCloseMenu } = useToggleMenu()

   const cancelModal = () => {
      setAnchorEl(null)
      onCloseMenu()
   }
   return (
      <ModalWindow open={isActive === 'user-logout'} handleClose={cancelModal}>
         <StyledProfileModalContainer>
            <p className="title">Are you sure to logout?</p>
            <div className="button">
               <Button className="cancel" onClick={cancelModal}>
                  Cancel
               </Button>
               <Button onClick={() => loggedOut()}>Log out</Button>
            </div>
         </StyledProfileModalContainer>
      </ModalWindow>
   )
}
const StyledProfileModalContainer = styled('div')(() => ({
   width: '400px',
   height: '115px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '30px 0',
   fontFamily: '"Cera Pro" , sans-serif',

   '& .button': {
      display: 'flex',
      gap: '10px',
   },

   '& .title': {
      color: '',
   },

   '& .cancel': {
      background: 'none',
      border: '1px solid #0079BF',
      color: '#0079BF',

      '&:hover': {
         color: '#FFFFFF',
         background: '#0079BF',
      },
   },
}))

export default ProfileModal
