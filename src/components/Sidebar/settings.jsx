import { Settings as SettingsIcon } from '@mui/icons-material'

import {
   styled,
   ListItem,
   ListItemIcon,
   ListItemText,
   ListItemButton,
} from '@mui/material'
import { useState } from 'react'
import EditModal from '../UI/DeleteWorkspace/EditNameModal'

const Settings = ({ open }) => {
   const [isOpenModal, setIsOpenModal] = useState(false)

   const handleOpenModal = () => {
      setIsOpenModal((prev) => !prev)
   }

   return (
      <>
         <StyledListItem disablePadding open={open}>
            <StyledListItemButton>
               <StyledListItemIcon open={open}>
                  <SettingsIcon />
               </StyledListItemIcon>
               <StyledListItemText
                  primary="Settings"
                  open={open}
                  onClick={handleOpenModal}
               />
            </StyledListItemButton>
         </StyledListItem>
         <EditModal open={isOpenModal} onClose={handleOpenModal} />
      </>
   )
}

export default Settings

export const StyledListItemText = styled(ListItemText)(({ open }) => ({
   opacity: open ? 1 : 0,
}))

export const StyledListItem = styled(ListItem)(() => ({
   display: 'block',
}))
export const StyledListItemButton = styled(ListItemButton)(() => ({
   borderRadius: '0 24px 24px 0',
   justifyContent: 'initial',
   padding: '6px 0 6px 23px',
   ':hover': {
      minWidth: '210px',
   },
}))
export const StyledListItemIcon = styled(ListItemIcon)(({ open }) => ({
   marginRight: open ? '10px' : 'auto',
   minWidth: 0,
   justifyContent: 'center',
}))
