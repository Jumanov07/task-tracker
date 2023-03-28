import { styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Remove } from '../../assets/icons'
import { useInnerPageBackgroundMutation } from '../../redux/api/inner-page-board-api'
import AuthInput from '../input/AuthInput'
import Button from '../UI/Button'
import ModalWindow from '../UI/ModalWindow'

const InnerPageModal = ({ newName, setNewName, boardName }) => {
   const { boardId } = useParams()
   const [innerPageBackground] = useInnerPageBackgroundMutation()

   const [value, setValue] = useState('')

   useEffect(() => {
      setValue(boardName)
   }, [boardName])

   const addNameHandler = () => {
      const newData = {
         boardId: +boardId,
         value,
         background: false,
      }
      if (value.length > 3 && boardName !== value) {
         innerPageBackground(newData)
         setValue('')
      }
      setNewName((prev) => !prev)
   }

   const modalHandleClose = () => {
      setNewName((prev) => !prev)
   }

   return (
      <StyledModalWindow open={newName} handleClose={addNameHandler}>
         <TitleWrapper>
            <h3 className="name">Edit name of the board</h3>
            <Remove className="remove" onClick={modalHandleClose} />
         </TitleWrapper>
         <StyledAuthInput
            placeholder="Name"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
         />
         <StyledButton onClick={addNameHandler} disabled={boardName === value}>
            Save
         </StyledButton>
      </StyledModalWindow>
   )
}

const StyledModalWindow = styled(ModalWindow)(() => ({
   '& .MuiPaper-root': {
      padding: 16,
      width: '500px',
      height: '300px',
   },
}))

const StyledAuthInput = styled(AuthInput)(() => ({
   '& .MuiInputBase-root': {
      width: '348px',
   },
}))

const TitleWrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 5px',
   width: '270px',
   '& .name': {
      fontSize: '14px',
      fontWeight: '400',
      color: '#919191',
   },
   '& .remove': {
      cursor: 'pointer',
   },
}))

const StyledButton = styled(Button)(() => ({
   width: '80px',
   position: 'relative',
   left: '180px',
   top: '5px',
   marginBottom: '10px',
   fontSize: '14px',
}))

export default InnerPageModal
