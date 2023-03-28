import { styled, Avatar } from '@mui/material'
import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import iconChange from '../../assets/icons/iconChange.svg'
import DropzoneWithFileReader from './Dropzone'

export default function ChangePhotoProfile({ setFile }) {
   const [anchorEl, setAnchorEl] = React.useState(false)
   const open = Boolean(anchorEl)
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(false)
   }
   const handlePhotoProfile = (e) => {
      return e
   }
   const removePhoteProfile = () => {
      setFile(null)
      handleClose()
   }
   return (
      <div>
         <Change onClick={handleClick} alt="Travis Howard" src={iconChange} />
         <MenuButton
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            keepMounted
         >
            <MenuItem onClick={handleClose}>
               <DropzoneWithFileReader
                  setFile={setFile}
                  handlePhotoProfile={handlePhotoProfile}
               >
                  Change photo profile
               </DropzoneWithFileReader>{' '}
            </MenuItem>
            <MenuItem onClick={removePhoteProfile}>Remove</MenuItem>
         </MenuButton>
      </div>
   )
}
const Change = styled(Avatar)(() => ({
   backgroundColor: '#f0f0f0',
   boxSizing: 'border-box',
   padding: 9,
   position: 'absolute',
   top: '270px',
   left: '200px',
}))

const MenuButton = styled(Menu)(() => ({
   '& .MuiMenuItem-root': {
      color: '#000000',
      transitionDuration: '0.3s',
   },
}))
