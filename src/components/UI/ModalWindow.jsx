import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import styled from '@emotion/styled'

export default function ModalWindow({
   open,
   handleClose,
   actions,
   title,
   children,
}) {
   return (
      <ModalDialog open={open} onClose={handleClose}>
         <DialogTitle>{title}</DialogTitle>
         <DialogContent>{children}</DialogContent>
         {actions ? <DialogActions>{actions}</DialogActions> : null}
      </ModalDialog>
   )
}
const ModalDialog = styled(Dialog)(() => ({
   '& .MuiPaper-root': {
      padding: 16,
   },
   '& .MuiTypography-root': {
      textAlign: 'center',
      padding: 0,
   },
   '& .MuiDialogContent-root': {
      padding: 0,
   },
}))
