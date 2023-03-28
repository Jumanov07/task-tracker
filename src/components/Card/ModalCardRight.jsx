import { styled } from '@mui/material'
import React from 'react'
import {
   Archive,
   CheckListCard,
   Delete,
   LabelIcon,
   MemberIcon,
   Remove,
   Time,
} from '../../assets/icons'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import Comments from '../Comments/Comments'
import CheckList from './CheckList'
import EstimitaionModal from './EstimitaionModal'
import LabelModal from './LabelModal'
import ModalMembers from './ModalMembers'

const ModalCardRight = () => {
   const { setIsActiveMenu, onCloseMenu, board } = useToggleMenu()

   return (
      <StyledContainer>
         <StyledRemove>
            <Remove onClick={() => onCloseMenu()} />
         </StyledRemove>
         <h3 className="add">Add</h3>
         <EstimationWrapper>
            <button
               onClick={() => setIsActiveMenu('card', board, 'members-card')}
            >
               <MemberIcon className="icon" /> Members
            </button>
            <button
               onClick={() => setIsActiveMenu('card', board, 'estimation-card')}
            >
               <Time className="icon" /> Estimation
            </button>
            <button
               onClick={() => setIsActiveMenu('card', board, 'label-card')}
               className="label"
            >
               <LabelIcon className="labelIcon" />
               Label
            </button>
            <button
               onClick={() => setIsActiveMenu('card', board, 'check-list-card')}
            >
               <CheckListCard className="icon" /> Checklist
            </button>
         </EstimationWrapper>
         <div>
            <h3 className="actions">Actions</h3>
            <StyledActions>
               <button
                  onClick={() => setIsActiveMenu('card', board, 'action-cards')}
               >
                  <Delete className="iconActions" /> Delete
               </button>
               <button
                  onClick={() => setIsActiveMenu('card', board, 'archive-card')}
               >
                  <Archive className="iconActions" />
                  Archive
               </button>
            </StyledActions>
         </div>
         <Comments id={board} />
         <ModalMembers />
         <EstimitaionModal />
         <LabelModal />
         <CheckList />
      </StyledContainer>
   )
}

const StyledContainer = styled('div')(() => ({
   marginLeft: '15px',
   '& .add': {
      margin: '0px 0 5px 0',
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
   },
   '& .actions': {
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
      margin: '5px 0 5px 0',
   },
}))

const StyledRemove = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   cursor: 'pointer',
   justifyContent: 'flex-end',
   paddingRight: '26px',
}))

const EstimationWrapper = styled('div')(() => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)',
   gridTemplateRows: 'repeat(2, 1fr)',
   gridRowGap: '8px',

   '& button': {
      width: '164px',
      height: '30px',
      borderRadius: '8px',
      color: '#172B4D',
      background: '#F4F5F7',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px 5px',
      border: 'none',
      cursor: 'pointer',
   },

   '& .icon': {
      position: 'relative',
      right: '20px',
   },

   '& .label': {
      paddingRight: '25px',
   },

   '& .labelIcon': {
      position: 'relative',
      right: '22px',
   },
}))

const StyledActions = styled('div')(() => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)',
   // gridRowGap: '8px',
   marginBottom: '20px',

   '& .iconActions': {
      position: 'relative',
      right: '30px',
   },

   '& button': {
      width: '164px',
      height: '30px',
      borderRadius: '8px',
      color: '#172B4D',
      background: '#F4F5F7',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      cursor: 'pointer',
   },
}))
export default ModalCardRight
