import {
   Avatar,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Typography,
   styled,
   ButtonBase,
} from '@mui/material'

import { useEffect, useState } from 'react'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'

import DateFormat from '../UI/DateFormat'
import EditComment from './EditComment'

const CommentItem = ({
   id,
   text,
   localDateTime,
   userResponse,
   onEditId,
   newObj,
   setIdForDelete,
   isMine,
}) => {
   const [onEdit, setOnEdit] = useState(null)
   const [textLength, setTextLength] = useState(false)
   const { setIsActiveMenu } = useToggleMenu()

   const addIdForEdit = () => {
      onEditId(id)
      setOnEdit(id)
   }

   useEffect(() => {
      if (text.length > 32) {
         setTextLength(true)
      }
   }, [])

   const removeHandler = () => {
      setIsActiveMenu('delete-comment')
      setIdForDelete(id)
   }

   const cancelEditComment = () => {
      setOnEdit(null)
   }

   const isShowText = () => {
      setTextLength(!textLength)
   }

   return (
      <StyledListItem divider>
         {newObj?.id === onEdit ? (
            <EditComment
               newObj={newObj}
               cancelEditComment={cancelEditComment}
            />
         ) : (
            <>
               <StyledListItemAvatar>
                  <StyledAvatar
                     src={userResponse.photoLink}
                     alt="avatar"
                     className="avatar"
                  />
               </StyledListItemAvatar>

               <Content>
                  <ListItemText
                     primary={userResponse.fullName}
                     className="fullName"
                     secondary={
                        <Typography
                           variant="body1"
                           className="text"
                           noWrap={textLength}
                        >
                           {textLength ? text.slice(0, 32) : text}
                           {text.length > text.slice(0, 32).length && (
                              <button onClick={isShowText} className="button">
                                 {textLength && 'развернуть'}
                                 {textLength || 'свернуть'}
                              </button>
                           )}
                        </Typography>
                     }
                  />

                  <div className="actions">
                     <DateFormat date={localDateTime} />
                     {isMine ? (
                        <div className="buttonWrapper">
                           <StyledButton onClick={addIdForEdit}>
                              Edit
                           </StyledButton>
                           <StyledButton onClick={removeHandler}>
                              Delete
                           </StyledButton>
                        </div>
                     ) : null}
                  </div>
               </Content>
            </>
         )}
      </StyledListItem>
   )
}
export default CommentItem

const Content = styled('div')(() => ({
   cursor: 'pointer',

   '& .actions': {
      display: 'flex',
      fontSize: '16px',
      justifyContent: 'space-between',
      columnGap: '15px',
      color: '#919191',
   },
   '& .buttonWrapper': {
      marginLeft: '20px',
   },

   '& .actions:hover': {
      '& .buttonWrapper': {
         display: 'flex',
         columnGap: '15px',
         marginLeft: '20px',
      },
   },
}))

const StyledListItemAvatar = styled(ListItemAvatar)(() => ({
   alignSelf: 'flex-start',
   marginTop: '7px',
   display: 'flex',
   justifyContent: 'flex-end',
   paddingRight: '5px',
   width: '20px',
}))

const StyledAvatar = styled(Avatar)(() => ({
   width: '34px',
   height: '34px',
}))

const StyledListItem = styled(ListItem)(() => ({
   fontSize: '14px',
   fontWeight: '400',

   '& .buttonWrapper': {
      display: 'none',
   },

   '& .fullName': {
      fontSize: '14px',
      fontWeight: '400',
   },

   '& .text': {
      color: '#616161',
      maxWidth: '210px',
      fontSize: '14px',
      fontWeight: '400',
      wordWrap: 'break-word',
   },

   '& .button': {
      background: 'none',
      border: 'none',
      color: '#616161',
      fontSize: '12px',
      fontWeight: '400',
      position: 'absolute',
      top: '30px',
      right: '5px',
      cursor: 'pointer',
   },

   '&:hover': {
      '& .buttonWrapper': {
         display: 'flex',
         columnGap: '15px',
      },
   },

   '&': {
      margin: '0',
      padding: '0',
      width: 'inherit',
      maxWidth: '365px',
      display: 'flex',
      paddingBottom: '15px',
   },

   '&:last-child': {
      border: 'none',
   },
}))

const StyledButton = styled(ButtonBase)(() => ({
   size: 'large',
   boxSizing: 'border-box',
   textDecoration: 'underline',
   textTransform: 'capitalize',
   background: 'none',
}))
