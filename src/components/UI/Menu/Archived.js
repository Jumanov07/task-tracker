import { styled } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import { useMenuArchiveQuery } from '../../../redux/api/inner-page-board-api'
import {
   useDeleteCardArchivedMutation,
   useUnarchivingCardMutation,
} from '../../../redux/api/column-api'
import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'
import CardItem from '../../Columns/CardItem'
import ModalWrapper from './ModalWrapper'

const Archived = () => {
   const { boardId } = useParams()
   const { isActive, onCloseMenu } = useToggleMenu()
   const [deleteCardArchived] = useDeleteCardArchivedMutation()
   const [unarchivingCard] = useUnarchivingCardMutation()

   const { data } = useMenuArchiveQuery(boardId)
   const deleteCard = (id) => {
      deleteCardArchived(id)
   }
   const cardUnarchiving = (id) => {
      unarchivingCard(id)
   }
   return (
      <ModalWrapper
         archived="true"
         isOpen={isActive === 'archivedCard'}
         isActive={isActive}
         onCloseMenu={() => onCloseMenu()}
         text
      >
         <div>
            {data?.map((item) => (
               <StyledArhive key={item.id}>
                  <StyledCardItem>
                     <CardItem {...item} />
                  </StyledCardItem>
                  <div className="buttons">
                     <button
                        className="sendToBoard"
                        onClick={() => cardUnarchiving(item.id)}
                     >
                        Send to board
                     </button>
                     <button
                        className="sendToBoard"
                        onClick={() => deleteCard(item.id)}
                     >
                        Delete
                     </button>
                  </div>
               </StyledArhive>
            ))}
         </div>
      </ModalWrapper>
   )
}

const StyledArhive = styled('div')(() => ({
   width: '277px',
   height: '137px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   margin: 'auto',
   '& .buttons': {
      width: '265px',
      display: 'flex',
      justifyContent: 'space-between',
   },
   '& .sendToBoard': {
      color: '#919191',
      fontSize: '16px',
      fontWeight: '400',
      cursor: 'pointer',
      marginTop: '5px',
      border: 'none',
      background: 'none',
   },
}))

const StyledCardItem = styled('div')(() => ({
   boxShadow: '0px 3px 8px 0px rgba(34, 60, 80, 0.2)',
   width: '277px',
   heigth: '111px',
   borderRadius: '4px',
}))
export default Archived
