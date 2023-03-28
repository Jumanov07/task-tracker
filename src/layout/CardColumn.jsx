import React, { useEffect, useState } from 'react'

import { MoreHoriz } from '@mui/icons-material'

import { Card as MuiCard, CardHeader, IconButton, styled } from '@mui/material'

import { toast } from 'react-toastify'
import CardItem from '../components/Columns/CardItem'
import Menu from '../components/Columns/MenuItem'
import Form from '../components/Columns/Form'
import Card from '../components/Card/Card'

import { AddCardBoard, NotificaionIcon } from '../assets/icons'
import {
   useAddCardMutation,
   useArhiveAllCardsMutation,
   useDeleteAllCardMutation,
} from '../redux/api/column-api'

const CardColumn = ({ id, columns, name, deleteColumn }) => {
   const [addCard] = useAddCardMutation()
   const [isAddFormVisible, setIsAddFormVisible] = useState(false)
   const [deleteAllColumnCards] = useDeleteAllCardMutation()
   const [arhiveAllCards, { isSuccess }] = useArhiveAllCardsMutation()
   const [value, setValue] = useState('')
   const [anchorElUser, setAnchorElUser] = React.useState(null)

   useEffect(() => {
      if (isSuccess) {
         toast.success('All cards is column  archived')
      }
   }, [isSuccess])

   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)
   }
   const handleCloseUserMenu = () => {
      setAnchorElUser(null)
   }

   const arhiveCards = async (id) => {
      await arhiveAllCards(id)
   }

   const deleteAllCards = async (id) => {
      await deleteAllColumnCards(id)
   }

   const addCardHandler = async () => {
      if (value.length >= 3) {
         const newCard = {
            columnId: id,
            name: value,
         }
         await addCard(newCard)
         setIsAddFormVisible(false)
         setValue('')
      }
   }
   const handleCloseCard = () => {
      if (isAddFormVisible) {
         setIsAddFormVisible(false)
      }
   }
   return (
      <StyledCard data-aos="zoom-out" onClick={handleCloseCard}>
         <StyledCardHeader
            title={name}
            action={
               <>
                  <IconButton>
                     <NotificaionIcon />
                  </IconButton>
                  <IconButton onClick={(e) => handleOpenUserMenu(e)}>
                     <MoreHoriz />
                  </IconButton>
               </>
            }
         />
         <Menu
            id={id}
            anchorElUser={anchorElUser}
            deleteColumn={deleteColumn}
            deleteAllCards={() => deleteAllCards(columns.id)}
            closeUserMenu={handleCloseUserMenu}
            setIsAddFormVisible={setIsAddFormVisible}
            column={columns}
            arhiveAllCards={arhiveAllCards}
         />
         <StyledCardsRender>
            {columns.cardResponses?.map((card) => {
               return (
                  <CardItem
                     {...card}
                     columnId={columns?.id}
                     value={value}
                     key={card.id}
                     setValue={setValue}
                     addCardHandler={() => addCardHandler(card.id)}
                     isAddFormVisible={isAddFormVisible}
                     setIsAddFormVisible={setIsAddFormVisible}
                     arhiveAllCards={arhiveCards}
                  />
               )
            })}
         </StyledCardsRender>

         {isAddFormVisible ? (
            <Form
               value={value}
               onClick={addCardHandler}
               buttonTitle="Create Card"
               onChange={(e) => setValue(e.target.value)}
            />
         ) : (
            <StyledDiv>
               <p
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsAddFormVisible(true)}
               >
                  +Add a card
               </p>
               <AddCardBoard />
            </StyledDiv>
         )}
         <Card />
      </StyledCard>
   )
}

export const StyledDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 8px 0 ',
   color: 'rgba(0, 0, 0, 1)',
   fontSize: '16px',
   lineHeight: '20px',
}))

export default CardColumn

export const StyledCard = styled(MuiCard)(() => ({
   padding: '11px 8px 15px',
   width: '280px',
   maxHeight: '500px',
   minWidth: '280px',
   backgroundColor: 'rgba(230, 230, 230, 1)',
   display: 'flex',
   flexDirection: 'column',
   alignSelf: 'flex-start',
}))

export const StyledCardHeader = styled(CardHeader)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 4.35px 0 8px',
   marginBottom: '10px',
   '& .MuiTypography-root ': {
      display: 'flex',
      fontSize: '16px',
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 1)',
   },
}))
const StyledCardsRender = styled('div')(() => ({
   overflowY: 'auto',
   height: '100%',
   width: '100%',

   '::-webkit-scrollbar': {
      height: '100%',
      width: '10px',
   },
   '::-webkit-scrollbar-track': {
      borderRadius: '8px',
   },
   '::-webkit-scrollbar-thumb': {
      background: ' rgba(104, 111, 123, 0.625)',
      borderRadius: '8px',
   },
   '::-webkit-scrollbar-button': {
      width: '5px',
   },
}))
