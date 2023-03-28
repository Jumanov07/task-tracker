import { Avatar, MenuItem, styled } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGetAllMembersQuery } from '../../redux/api/card-crud-api'
import { ROUTES } from '../../utils/constants/routes'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import ModalWindow from '../UI/ModalWindow'
import Search from '../UI/Search/Search'
import ModalTitle from './ModalTitle'

const ModalMembers = () => {
   const { workspaceId } = useParams()
   const { card, setIsActiveMenu, board } = useToggleMenu()
   const { data: admins } = useGetAllMembersQuery(workspaceId)
   const [searchMembers, setSearchMembers] = useState('')
   const [adminList, setAdminList] = useState(admins)

   const navigate = useNavigate()

   const filterMembers = (searchText, listOfMembers) => {
      if (!searchText) {
         return listOfMembers
      }
      return listOfMembers.filter(({ email }) =>
         email.toLowerCase().includes(searchText.toLowerCase())
      )
   }

   useEffect(() => {
      const Debounce = setTimeout(() => {
         const filteredAdmins = filterMembers(searchMembers, admins)
         setAdminList(filteredAdmins)
      }, 300)

      return () => clearTimeout(Debounce)
   }, [searchMembers])

   const memoziedMembers = useMemo(() => {
      let content = <ContentP>Members doesn`t exist</ContentP>
      if (adminList?.length !== 0) {
         content = (
            <div>
               <h4 className="membersBoard">Workspace members</h4>

               {adminList?.map((item) => (
                  <StyledMembers
                     key={item.id}
                     onClick={() => navigate(`${ROUTES.PROFILE}/${item.id}`)}
                  >
                     <Avatar src={item.avatar} />
                     <div>
                        <h4>{item.name}</h4>
                        <p>{item.email}</p>
                     </div>
                  </StyledMembers>
               ))}
            </div>
         )
      }
      return content
   }, [adminList])

   return (
      <ModalWindow
         open={card === 'members-card'}
         handleClose={() => setIsActiveMenu('card', board)}
      >
         <StyledContainer>
            <div>
               <ModalTitle>Members</ModalTitle>
               <Search
                  value={searchMembers}
                  onChange={(e) => setSearchMembers(e.target.value)}
                  iconVariant="end"
               />
            </div>
            <StyledBlock>{memoziedMembers}</StyledBlock>
         </StyledContainer>
      </ModalWindow>
   )
}

const ContentP = styled('p')(() => ({
   color: 'black',
   fontSize: '16px',
   fontWeight: '600',
   display: 'flex',
   justifyContent: 'center',
   marginTop: '20px',
}))

const StyledContainer = styled('div')(() => ({
   width: '310px',
   minHeight: '300px',
   maxHeight: '544px',
   borderRadius: '10px',
   '& .members': {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0 100px',
      marginRight: '7px',
   },
   '& .title': {
      fontSize: '16px',
      fontWeight: '400',
      color: '#000000',
      position: 'relative',
      bottom: '5px',
   },
   '& .membersBoard': {
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
      marginTop: '12px',
   },
}))

const StyledMembers = styled(MenuItem)(() => ({
   display: 'flex',
   gap: '15px',
   cursor: 'pointer',
   '& h4': {
      color: '#111111',
      fontSize: '16px',
      fontWeight: '400',
   },
   '& p': {
      color: '#919191',
      fontSize: '16px',
      fontWeight: '400',
   },
}))
const StyledBlock = styled('div')(() => ({
   maxHeight: '470px',
   overflowY: 'auto',
}))

export default ModalMembers
