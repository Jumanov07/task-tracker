import React, { useState } from 'react'
import dateFormat from 'dateformat'

import { Avatar, styled, TextareaAutosize } from '@mui/material'
import { useSendAfterChangeMutation } from '../../redux/api/comment-api'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import Button from '../UI/Button'

const EditComment = ({ cancelEditComment, newObj }) => {
   const { text, userResponse, id } = newObj

   const [sendAfterChange] = useSendAfterChangeMutation()
   const [valueEdit, setValueEdit] = useState(text)

   const { onCloseMenu } = useToggleMenu()

   const saveAfterChange = () => {
      const date = new Date()
      const formatDate = new Date(date)
      const monthDay = dateFormat(formatDate, 'yyyy-mm-d')
      const time = dateFormat(formatDate, 'HH:MM')
      const fullDate = `${monthDay}T${time}`
      if (valueEdit.length >= 1) {
         const newText = {
            id,
            text: valueEdit,
            localDateTime: fullDate,
         }

         sendAfterChange(newText)
      }
      onCloseMenu()
      cancelEditComment()
   }
   return (
      <StyledEditComment>
         <div className="avatarName">
            <Avatar sx={{ width: '34px', height: '34px' }} />
            <p>{userResponse.fullName}</p>
         </div>

         <StyledForm>
            <StyledTextareaAutosize
               value={valueEdit}
               onChange={(e) => setValueEdit(e.target.value)}
            />
         </StyledForm>

         <StyledButtons>
            <Button className="button1" onClick={cancelEditComment}>
               Cancel
            </Button>
            <Button
               className="button2"
               onClick={saveAfterChange}
               disabled={text === valueEdit}
            >
               Save
            </Button>
         </StyledButtons>
      </StyledEditComment>
   )
}

const StyledEditComment = styled('div')(() => ({
   width: '357px',
   background: '#F4F5F7',

   '& .avatarName': {
      display: 'flex',
      justifyContent: 'flex-start',
      gap: '10px',
      paddingLeft: '12px',
      fontSize: '14px',
      fontWeight: '400',
   },

   '& .button1': {
      width: '78px',
      background: '#F0F0F0',
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
      ':hover': {
         background: '#F0F0F0',
      },
   },

   '& .button2': {
      width: '78px',
      fontSize: '14px',
      fontWeight: '400',
   },
}))

const StyledForm = styled('form')(() => ({
   width: '90%',
   margin: 'auto',
   marginTop: '6px',
}))

const StyledTextareaAutosize = styled(TextareaAutosize)(() => ({
   width: '100%',
   maxWidth: '324px',
   maxHeight: '218px',
   padding: ' 5px 0 0 10px',
   borderRadius: '8px',
   minHeight: '54px',
   overflowY: 'scroll',
   resize: 'none',
}))

const StyledButtons = styled('div')(() => ({
   marginTop: '8px',
   display: 'flex',
   justifyContent: 'flex-end',
   marginRight: '12px',
   gap: '16px',
}))

export default EditComment
