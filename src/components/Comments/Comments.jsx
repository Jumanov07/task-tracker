import React, { useState } from 'react'
import dateFormat from 'dateformat'

import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   InputBase,
   styled,
   Typography,
} from '@mui/material'

import { DoubleUpIcon, Remove } from '../../assets/icons'
import CommentItem from './CommentItem'
import ModalWindow from '../UI/ModalWindow'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import Button from '../UI/Button'

import {
   useAddCommentTextMutation,
   useDeleteCommentMutation,
   useGetCommentsAllQuery,
} from '../../redux/api/comment-api'

const Comments = ({ isExpanded, setIsExpanded, id }) => {
   const { data } = useGetCommentsAllQuery(id)
   const [isActiveComment, setIsActiveComment] = useState(false)

   const newData = data || []

   const mapped = newData?.map((el, i) => {
      return { index: i, value: el.id }
   })

   mapped?.sort((a, b) => {
      if (a.value < b.value) {
         return 1
      }
      if (a.value > b.value) {
         return -1
      }
      return 0
   })

   const result = mapped.map((el) => {
      return data[el.index]
   })

   const [newObj, setNewObj] = useState(null)
   const [commentValue, setCommentValue] = useState('')
   const [idForDelete, setIdForDelete] = useState(null)

   const [deleteComment] = useDeleteCommentMutation()
   const { isActive, onCloseMenu } = useToggleMenu()
   const [addCommentText] = useAddCommentTextMutation()

   const handleExpand = () => {
      setIsExpanded(() => !undefined)
   }

   const commentChanged = (id) => {
      const newFind = data?.find((item) => item.id === id)
      setNewObj(newFind)
   }

   const date = new Date()
   const formatDate = new Date(date)
   const monthDay = dateFormat(formatDate, 'yyyy-mm-d')
   const time = dateFormat(formatDate, 'HH:MM')
   const fullDate = `${monthDay}T${time}`

   const addCommentHandler = async (e) => {
      e.preventDefault()
      if (commentValue.length > 1) {
         const newComment = {
            id,
            text: commentValue,
            localDateTime: fullDate,
         }

         await addCommentText(newComment)
         setCommentValue('')
      }
   }

   const addComment = () => {
      setIsActiveComment((prev) => !prev)
   }

   const deleteHandler = async () => {
      await deleteComment(idForDelete)
      onCloseMenu()
   }

   return (
      <AccordionWrapper>
         <StyledAccordion expanded={isExpanded}>
            <StyledAccordionSummary
               onClick={addComment}
               expandIcon={<DoubleUpIcon className="doubleUpon" />}
               onChange={handleExpand}
            >
               <Typography
                  className="typography"
                  variant="subtitle1"
                  color="#919191"
                  margin="0px"
               >
                  Comments
               </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
               {result?.map((comment) => (
                  <CommentItem
                     onEditId={commentChanged}
                     key={comment.id}
                     setIdForDelete={setIdForDelete}
                     {...comment}
                     newObj={newObj}
                  />
               ))}
            </StyledAccordionDetails>
         </StyledAccordion>
         {isActiveComment ? null : (
            <StyledAccordionDetails>
               {result?.slice(0, 3)?.map((comment) => (
                  <CommentItem
                     onEditId={commentChanged}
                     key={comment.id}
                     setIdForDelete={setIdForDelete}
                     {...comment}
                     newObj={newObj}
                  />
               ))}
            </StyledAccordionDetails>
         )}

         <form onSubmit={addCommentHandler}>
            <StyledTextField
               value={commentValue}
               onChange={(e) => setCommentValue(e.target.value)}
               fullWidth
               placeholder="Write a comment"
            />
         </form>

         <ModalWindow
            open={isActive === 'delete-comment'}
            handleClose={() => onCloseMenu()}
         >
            <StyleModalComment>
               <div className="title">
                  <p>Delete comment?</p>
                  <Remove className="remove" onClick={() => onCloseMenu()} />
               </div>
               <p className="text">
                  Deleting a comment is forever. There is no undo.
               </p>
               <StyledButton onClick={deleteHandler}>Delete</StyledButton>
            </StyleModalComment>
         </ModalWindow>
      </AccordionWrapper>
   )
}

const AccordionWrapper = styled('div')(() => ({
   width: '345px',
   background: '#f4f5f7',
   borderRadius: '8px',
   minHeight: '175px',
   display: 'flex',
   flexDirection: 'column',
   marginRight: '10px',
   justifyContent: 'space-between',
}))

const StyledAccordion = styled(Accordion)(() => ({
   boxShadow: 'none',
   background: '#f4f5f7',
}))

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
   height: '36px',
   minHeight: '0',

   '& .doubleUpon': {
      cursor: 'pointer',
   },
}))

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
   '&': {
      padding: 0,
      maxHeight: '375px',
      overflowY: 'scroll',
      '::-webkit-scrollbar': {
         width: '12px',
         right: '30px',
      },

      '::-webkit-scrollbar-track': {
         background: '#f6f6f6',
      },

      '::-webkit-scrollbar-thumb': {
         background: '#d9d9d9',
         borderRadius: '8px',
         height: '181px',
      },
   },
}))

const StyledTextField = styled(InputBase)(() => ({
   '&': {
      width: '313px',
      height: '44px',
      border: '1px solid #D0D0D0',
      margin: '0 16px 8px',
      borderRadius: '8px',
      paddingLeft: '20px',
   },
}))

const StyleModalComment = styled('div')(() => ({
   width: '284px',
   height: '154px',
   borderRadius: '10px',

   '& .title': {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '45px',
      padding: '10px 20px 0 0',

      '& p': {
         color: '#000000',
         fontSize: '16px',
         fontWeight: '400',
      },
   },

   '& .remove': {
      position: 'relative',
      top: '6px',
      cursor: 'pointer',
   },

   '& .text': {
      width: '254px',
      margin: '0 auto',
      marginTop: '14px',
      color: '#919191',
      fontSize: '16px',
      fontWeight: '400',
   },
}))
const StyledButton = styled(Button)(() => ({
   width: '270px',
   height: '30px',
   background: '#D91212',
   color: '#FFFFFF',
   marginLeft: '10px',
   position: 'absolute',
   bottom: '16px',

   ':hover': {
      background: '#D91212',
   },
}))

export default Comments
