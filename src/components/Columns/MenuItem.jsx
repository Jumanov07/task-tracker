import {
   styled,
   Typography,
   Menu as MuiMenu,
   MenuItem as MuiMenuItem,
} from '@mui/material'
import React from 'react'
import { useDeleteColumnMutation } from '../../redux/api/column-api'

const MenuItem = ({ onClick, children }) => {
   return (
      <MuiMenuItem onClick={onClick}>
         <Typography textAlign="center">{children}</Typography>
      </MuiMenuItem>
   )
}

const Menu = ({
   anchorElUser,
   closeUserMenu,
   id,
   setIsAddFormVisible,
   deleteAllCards,
   arhiveAllCards,
   column,
}) => {
   const [deleteColumn] = useDeleteColumnMutation()

   const addCardHandler = () => {
      closeUserMenu()
      setIsAddFormVisible((prev) => !prev)
   }
   const deleteAllCardsfn = () => {
      deleteAllCards(id)
      closeUserMenu()
   }
   const deleteColumnfn = () => {
      deleteColumn(id)
      closeUserMenu(false)
   }
   const arhiveCard = () => {
      arhiveAllCards(column.id)
      closeUserMenu(false)
   }

   return (
      <StyledMenu
         anchorEl={anchorElUser}
         open={Boolean(anchorElUser)}
         onClose={closeUserMenu}
      >
         <StyledDiv>Actions</StyledDiv>
         <MenuItem onClick={addCardHandler}>Add Card</MenuItem>
         <MenuItem onClick={deleteColumnfn}>Delete a column</MenuItem>
         <MenuItem onClick={deleteAllCardsfn}>
            Delete all cards in this list
         </MenuItem>
         <MenuItem onClick={arhiveCard}>
            Archive all cards in this list
         </MenuItem>
      </StyledMenu>
   )
}

export default Menu

const StyledDiv = styled('div')(() => ({
   display: 'flex',
   width: '100%',
   justifyContent: 'center',
   color: 'inherit',
   fontSize: '20px',
   lineHeight: '1.5',
   margin: '0 5px',
   letterSpacing: '1.3px',
}))
const StyledMenu = styled(MuiMenu)(() => ({
   position: 'absolute',
   left: '-23px',
   borderRadius: '40px',

   '& .MuiPaper-root': {
      minWidth: '260px',
      borderRadius: '10px',
   },
   '& .MuiList-root': {
      display: 'flex',
      flexDirection: 'column',
   },
}))
