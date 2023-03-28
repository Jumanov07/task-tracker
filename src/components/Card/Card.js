import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import dateFormat from 'dateformat'
import {
   styled,
   Modal,
   Box,
   Typography,
   AvatarGroup,
   Avatar,
   TextareaAutosize,
} from '@mui/material'
import { DownArrowIcon, IconChange, Remove } from '../../assets/icons/index'
import Button from '../UI/Button'
import ChecklistTitle from '../UI/ChecklistTitle'
import {
   useGetCardByIdQuery,
   useGetLabelQuery,
} from '../../redux/api/estimations-api'
import ModalCardRight from './ModalCardRight'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import {
   useRemoveLabelsMutation,
   useUpdateCardNameMutation,
} from '../../redux/api/card-crud-api'

const Card = () => {
   const { boardId } = useParams()

   const [textArearValue, setTextAreaValue] = useState('')

   const [editCardName, setEditCardName] = useState(false)
   const { isActive, board, onCloseMenu } = useToggleMenu()
   const [removeLabels] = useRemoveLabelsMutation()
   const [updateCardName] = useUpdateCardNameMutation()

   const [valueTitle, setValueTitle] = useState('')
   const { data } = useGetCardByIdQuery(board, { skip: isActive !== 'card' })
   const { columnId } = useSelector((state) => state.changeWidthColumns)

   const { data: forLabel } = useGetLabelQuery(boardId)

   const { columnResponses } = forLabel || {}

   const newFind = columnResponses?.find((item) => item.id === columnId)

   const FindCard = newFind?.cardResponses?.find((item) => item.id === +board)
   const { labelResponses, name: cardName } = FindCard || {}
   console.log(labelResponses)

   useEffect(() => {
      setValueTitle(cardName)
   }, [cardName])

   const { name, memberResponses, estimationResponse } = data || {}

   const { dateOfStart, dateOfFinish } = estimationResponse || {}

   const getDate = (fullYear) => {
      let fullDate = null
      if (fullYear) {
         const formatDate = new Date(fullYear)
         const monthDay = dateFormat(formatDate, 'd mmm, yyyy')
         const time = dateFormat(formatDate, 'HH:MM')
         fullDate = `${monthDay} / ${time}`
      }

      return fullDate
   }

   const addTitleCardHandler = async () => {
      const newTitle = {
         id: +board,
         value: valueTitle,
         isName: false,
      }

      await updateCardName(newTitle)
      setEditCardName(false)
   }

   const addDescription = async () => {
      const newDesc = {
         id: +board,
         value: textArearValue,
         isName: true,
      }
      await updateCardName(newDesc)
      setTextAreaValue('')
   }

   const cancelTitle = () => {
      setValueTitle('')
      setEditCardName(false)
   }

   const removeLabelById = (labelId) => {
      const newRemove = {
         cardId: +board,
         labelId,
      }
      removeLabels(newRemove)
   }

   return (
      <Modal
         sx={{ margin: '1% auto' }}
         open={isActive === 'card'}
         onClose={() => onCloseMenu()}
      >
         <StyledContainer>
            <div
               style={{
                  height: '600px',
                  overflowY: 'auto',
                  scrollSnapType: 'y',
               }}
            >
               <div style={{ width: '75%' }}>
                  <p className="title">
                     {editCardName ? (
                        <>
                           <input
                              value={valueTitle}
                              onChange={(e) => setValueTitle(e.target.value)}
                              type="text"
                              className="inputNameEdit"
                           />
                           <Button className="button" onClick={cancelTitle}>
                              cancel
                           </Button>
                           <Button
                              className="button"
                              onClick={addTitleCardHandler}
                           >
                              save
                           </Button>
                        </>
                     ) : (
                        <>
                           <IconChange
                              onClick={() => setEditCardName(true)}
                              className="iconChange"
                           />
                           {name}
                        </>
                     )}
                  </p>
                  <div>
                     <StyledLeftContainer>
                        <Typography body="h6" className="labels">
                           labels
                        </Typography>
                        <div className="labelsWrapper">
                           {labelResponses
                              ? labelResponses?.map((status) => {
                                   return (
                                      <StyledLabelWrapper
                                         key={status.id}
                                         color={status.color}
                                      >
                                         <p>{status.description}</p>
                                         <Remove
                                            className="remove"
                                            onClick={() =>
                                               removeLabelById(status.id)
                                            }
                                         />
                                      </StyledLabelWrapper>
                                   )
                                })
                              : null}
                        </div>
                        <DateMembers>
                           <div className="avatarContainer">
                              <h4>Start date</h4>
                              <div className="getDate">
                                 {getDate(dateOfStart)}
                              </div>
                           </div>
                           <div className="avatarContainer">
                              <h4>Due date</h4>
                              <div className="getDate">
                                 {getDate(dateOfFinish)}
                              </div>
                           </div>
                           <div className="avatarContainer">
                              <h4>Members</h4>
                              <AvatarGroup total={memberResponses?.length}>
                                 {memberResponses?.map((item) => (
                                    <Avatar
                                       key={Math.random().toString()}
                                       className="avatar"
                                       src={item.image}
                                    />
                                 ))}
                              </AvatarGroup>
                           </div>
                        </DateMembers>
                        <div>
                           <StyledDescription>
                              <span>
                                 <DownArrowIcon />
                              </span>
                              Description
                           </StyledDescription>
                           <StyledTextareaForm>
                              <TextareaAutosize
                                 value={textArearValue}
                                 onChange={(e) =>
                                    setTextAreaValue(e.target.value)
                                 }
                                 className="textArrea"
                                 minRows={3}
                                 placeholder="Add a description"
                              />
                              <div className="buttonContainer">
                                 <Button className="button">Cancel</Button>
                                 <Button
                                    className="button"
                                    onClick={addDescription}
                                 >
                                    Save
                                 </Button>
                              </div>
                           </StyledTextareaForm>
                        </div>
                     </StyledLeftContainer>
                  </div>
                  <ChecklistTitle cardId={+board} />
               </div>
            </div>

            <ModalCardRight />
         </StyledContainer>
      </Modal>
   )
}

const StyledContainer = styled(Box)(() => ({
   width: '69vw',
   height: '90vh',
   display: 'flex',
   margin: 'auto',
   border: 'none',
   borderRadius: '8px',
   background: '#FFFFFF',
   boxShadow: 24,
   padding: '16px 0 0 25px',
   p: 4,

   '& .title': {
      fontSize: '18px',
      fontWeight: '400',
      color: '#111111',
      display: 'flex',
      gap: '10px',
   },
   '& .iconChange': {
      marginTop: '7px',
      cursor: 'pointer',
   },

   '& .inputNameEdit': {
      border: '1px solid #D0D0D0',
      borderRadius: '8px',
      paddingLeft: '8px',
      width: '120px',
   },
   '& .button': {
      width: '75px',
   },
}))

const StyledLeftContainer = styled('div')(() => ({
   width: '660px',
   '& .labelsWrapper': {
      display: 'flex',
      gap: '10px',
   },
   '& .labels': {
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
      marginTop: '16px',
   },
}))

const StyledLabelWrapper = styled('div')(({ color }) => ({
   backgroundImage: `url(${color})`,
   padding: '6px 8px 6px 10px',
   marginTop: '8px',
   borderRadius: '7px',
   fontSize: '16px',
   display: 'flex',
   gap: '5px',
   alignItems: 'center',
   '& p': {
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: '500',
   },
   '& .remove * ': {
      fill: '#FFFFFF',
   },
   '& .remove': {
      width: '9px',
      height: '9px',
      cursor: 'pointer',
   },
}))

const DateMembers = styled('div')(() => ({
   display: 'flex',
   gap: '18px',
   paddingTop: '30px',
   '& .getDate': {
      width: '170px',
      height: '34px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '111111',
      fontSize: '14px',
      fontWeight: '500',
      border: '1px solid #D0D0D0',
      borderRadius: '8px',
   },

   '& h4': {
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
   },

   '& .avatar': {
      width: '34px',
      height: '34px',
      fontSize: '14px',
      cursor: 'pointer',
   },
   '& .MuiAvatarGroup-avatar': {
      width: '34px',
      height: '34px',
      fontSize: '14px',
   },
   '& .avatarContainer': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
   },
}))

const StyledDescription = styled('h3')(() => ({
   display: 'flex',
   gap: '13px',
   color: '#919191',
   fontSize: '14px',
   fontWeight: '400',
}))

const StyledTextareaForm = styled('form')(() => ({
   width: '610px',
   minHeight: '80px',
   display: 'flex',
   flexDirection: 'column',
   marginTop: '8px',
   '& .textArrea': {
      padding: '6px 10px',
      borderRadius: '10px',
      border: '1.5px solid #D0D0D0',
   },

   '& .buttonContainer': {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '10px',
      gap: '10px',
   },
   '& .button': {
      width: '78px',
      height: '36px',
   },
}))

export default Card
