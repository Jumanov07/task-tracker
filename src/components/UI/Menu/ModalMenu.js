import * as React from 'react'
import { useParams } from 'react-router'
import { MenuItem, styled } from '@mui/material'

import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'
import MenuTitle from './MenuTitle'
import DeleteModal from './DeleteModal'
import ChangeBackground from './ChangeBackground'
import Archived from './Archived'
import { BoxWrapper, MenuModalContainer } from './ModalWrapper'

import Mountain from '../../../assets/images/mountain.svg'
import { useMenuArchiveQuery } from '../../../redux/api/inner-page-board-api'

const ModalMenu = ({ isOpen }) => {
   const { boardId } = useParams()

   const { setIsActiveMenu, onCloseMenu, isActive } = useToggleMenu()

   const { data } = useMenuArchiveQuery(boardId)

   const archivedCount = data?.length

   return (
      <>
         <MenuModalContainer open={isOpen} onClose={() => onCloseMenu()}>
            <MenuBoxWrapper>
               <MenuTitle imgRemove={() => onCloseMenu()} />
               <MenuItemList
                  className="background"
                  onClick={() => setIsActiveMenu('change the background')}
               >
                  Change the background
                  <img src={Mountain} alt="mountain" className="image" />
               </MenuItemList>
               <MenuItemList
                  className="archives"
                  onClick={() => setIsActiveMenu('archivedCard')}
               >
                  In archive <span className="span">{archivedCount}</span>
               </MenuItemList>
               <MenuItemList onClick={() => setIsActiveMenu('delete')}>
                  Delete this board
               </MenuItemList>
            </MenuBoxWrapper>
         </MenuModalContainer>
         <ChangeBackground />
         <Archived />
         <DeleteModal isOpen={isActive === 'delete'} />
      </>
   )
}
export default ModalMenu

const MenuBoxWrapper = styled(BoxWrapper)(() => ({
   height: '178px',
   justifyContent: 'center',
}))

const MenuItemList = styled(MenuItem)(() => ({
   paddingLeft: '22px',
   paddingRight: '20px',
   fontSize: '16px',
   height: '43px',
   fontWeight: '400',

   '&.archives': {
      gap: '5px',
   },

   '&.background': {
      gap: '80px',
   },

   '& .image': {
      width: '59px',
      height: '26px',
      borderRadius: '6px',
   },
   '& .span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#B2B2B2',
      borderRadius: '16px',
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: '400',
      width: '26px',
      height: '18px',
   },
}))
